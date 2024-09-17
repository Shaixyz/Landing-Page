import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
//helllooooo
export default function ChatLayout() {
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]); // Lưu trữ các tệp hình ảnh đã chọn
    const [artworkId, setArtworkId] = useState('');
    const [artworkData, setArtworkData] = useState(null);
    const [previewImages, setPreviewImages] = useState([]); // Lưu các hình ảnh xem trước

    // Xử lý thay đổi khi chọn file
    const handleFileChange = (event) => {
        const selectedFiles = [...event.target.files];
        setImages(prevImages => [...prevImages, ...selectedFiles]); // Thêm tệp mới vào danh sách tệp đã chọn

        // Tạo URL cho các hình ảnh để xem trước
        const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages(prevPreviews => [...prevPreviews, ...imagePreviews]); // Thêm hình ảnh mới vào danh sách xem trước
    };

    // Function to handle image removal
    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        setPreviewImages(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    };

    // Xử lý khi submit form tạo artwork
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createArtwork(description, images);
            alert('Artwork submitted successfully!');
        } catch (error) {
            alert('Error submitting artwork.');
        }
    };

    // Xử lý khi submit form tìm artwork theo ID
    const handleFetchByIdSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://kietpt.online/api/Artwork/${artworkId}`);
            setArtworkData(response.data);
        } catch (error) {
            console.error('Error fetching artwork:', error);
            alert('Error fetching artwork.');
        }
    };

    // Gửi artwork lên server
    async function createArtwork(description, imageFiles) {
        const formData = new FormData();

        // Append the description (string)
        formData.append('Thumbnail', imageFiles[0]);

        // Append mỗi file trong imageFiles
        imageFiles.forEach((file) => {
            formData.append('Images', file); // 'Images' là tên của trường trong DTO
        });

        try {
            const response = await axios.post('https://kietpt.online/api/Artwork', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Artwork created:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Hiển thị các tệp khác nhau (ảnh, file)
    const renderFile = (fileUrl) => {
        const fileExtension = fileUrl.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            return <img src={fileUrl} alt="Artwork" style={{ maxWidth: '300px', marginBottom: '10px' }} />;
        } else {
            return (
                <div>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        {`View file (${fileExtension.toUpperCase()})`}
                    </a>
                </div>
            );
        }
    };

    return (
        <Box sx={{ padding: '20px', backgroundColor: 'pink', maxWidth: '600px', margin: '0 auto' }}>
            {/* Form tạo artwork */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Images:
                        <input
                            type="file"
                            multiple // Cho phép chọn nhiều tệp
                            accept="image/jpg, image/png, image/jpeg, .pdf, .docx, .xlsx, .xls, .pptx"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                {/* Hiển thị ảnh xem trước */}
                <div style={{ marginTop: '10px' }}>
                    <Typography variant="h6">Selected Images:</Typography>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {previewImages.map((preview, index) => (
                            <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                                <img src={preview} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <Button
                                    onClick={() => handleRemoveImage(index)}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderRadius: '50%',
                                        minWidth: '30px',
                                        minHeight: '30px',
                                        padding: '0',
                                        lineHeight: '1'
                                    }}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nút "Thêm 1 ảnh khác" */}
                {images.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                        <label>
                            <Button variant="contained" color="secondary" component="span">
                                Thêm 1 ảnh khác
                            </Button>
                            <input
                                type="file"
                                multiple
                                accept="image/jpg, image/png, image/jpeg, .pdf, .docx, .xlsx, .xls, .pptx"
                                onChange={handleFileChange}
                                style={{ display: 'none' }} // Ẩn input và chỉ hiển thị nút
                            />
                        </label>
                    </div>
                )}

                <button type="submit">Submit Artwork</button>
            </form>

            {/* Form tìm artwork theo ID */}
            <form onSubmit={handleFetchByIdSubmit} style={{ marginTop: '20px' }}>
                <TextField
                    label="Enter Artwork ID"
                    variant="outlined"
                    value={artworkId}
                    onChange={(e) => setArtworkId(e.target.value)}
                    required
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Fetch Artwork
                </Button>
            </form>

            {/* Hiển thị chi tiết artwork được fetch */}
            {artworkData && (
                <Box sx={{ marginTop: '20px' }}>
                    <Typography variant="h6">Artwork Details</Typography>
                    <div>
                        <Typography variant="body1">ID: {artworkData.id}</Typography>
                    </div>
                    <div>
                        <Typography variant="body1">Thumbnail:</Typography>
                        {renderFile(artworkData.thumbnail)}
                    </div>
                    <div>
                        <Typography variant="body1">Images:</Typography>
                        {artworkData.images.map((image) => (
                            <div key={image.id}>
                                {renderFile(image.location)}
                            </div>
                        ))}
                    </div>
                </Box>
            )}
        </Box>
    );
}
