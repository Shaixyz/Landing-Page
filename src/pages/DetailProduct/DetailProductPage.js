import React, { useState } from "react";
import large1 from "~/assets/detailproduct/image-product-1.jpg";
import large2 from "~/assets/detailproduct/image-product-2.jpg";
import large3 from "~/assets/detailproduct/image-product-3.jpg";
import large4 from "~/assets/detailproduct/image-product-4.jpg";
import closeIcon from "~/assets/icon-close-white.svg";
import cartIcon from "~/assets/icon-cart-white.svg";
import prevIcon from "~/assets/icon-previous.svg";
import nextIcon from "~/assets/icon-next.svg";


import small1 from "~/assets/detailproduct/image-product-1-thumbnail.jpg";
import small2 from "~/assets/detailproduct/image-product-2-thumbnail.jpg";
import small3 from "~/assets/detailproduct/image-product-3-thumbnail.jpg";
import small4 from "~/assets/detailproduct/image-product-4-thumbnail.jpg";

export const data = [
    {
        id: 1,
        largeImg: large1,
        smallImg: small1,
    },
    {
        id: 2,
        largeImg: large2,
        smallImg: small2,
    },
    {
        id: 3,
        largeImg: large3,
        smallImg: small3,
    },
    {
        id: 4,
        largeImg: large4,
        smallImg: small4,
    },
];


const DetailProductPage = ({ price = 125.0 }) => {
    const products = [...data];
    const [value, setValue] = useState(0);
    const [modal, setModal] = useState(false);
    const [qty, setQty] = useState(1);


    const largeImage = products[value].largeImg;
    const fixedPrice = price.toFixed(2);
    const totalPrice = (fixedPrice * qty).toFixed(2);

    const decreaseQty = () => {
        if (qty > 1) {
            setQty((prev) => prev - 1);
        }
    };

    const increaseQty = () => {
        setQty((prev) => prev + 1);
    };

    const toggleModal = () => {
        setModal((prev) => !prev);
    };

    const goBack = () => {
        setValue((prev) => (prev === 0 ? 0 : prev - 1));
    };

    const goForward = () => {
        setValue((prev) => (prev === products.length - 1 ? prev : prev + 1));
    };

    return (
        <main>
            <div className="main-wrapper bg-white dark:bg-gray-900 dark:text-white flex flex-col md:flex-row md:px-[200px] md:py-[100px] relative">
                <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
                    <div className="hidden md:block large-image">
                        <img
                            onClick={toggleModal}
                            className="object-cover cursor-pointer rounded-xl w-[400px] h-[400px]"
                            src={largeImage}
                            alt="product"
                        />
                    </div>
                    <div className="md:hidden large-image">
                        <img
                            onClick={goBack}
                            className="bg-white rounded-full p-4 absolute top-[15%] left-6 cursor-pointer"
                            src={prevIcon}
                            alt="previous"
                        />
                        <img
                            className="w-[100%] h-[300px] object-cover"
                            src={largeImage}
                            alt="product"
                        />
                        <img
                            onClick={goForward}
                            className="bg-white rounded-full p-4 absolute top-[15%] left-[82%] cursor-pointer"
                            src={nextIcon}
                            alt="next"
                        />
                    </div>
                    <div className="small-images hidden md:flex mt-7 justify-between w-[400px]">
                        {data.map((img, idx) => (
                            <div key={img.id} className="single-image">
                                <img
                                    onClick={() => setValue(idx)}
                                    className="w-[80px] cursor-pointer rounded-xl transition-all hover:opacity-25 hover:border-[3px] border-orange"
                                    src={img.smallImg}
                                    alt="product-thumbnail"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className={`${modal ? "block" : "hidden"
                        } absolute top-0 left-0 right-0 bottom-0 bg-lightBlack`}
                >
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="relative">
                            <img
                                className="w-[400px] h-[400px] rounded-xl cursor-pointer"
                                src={largeImage}
                                alt="product"
                            />
                            <img
                                onClick={toggleModal}
                                className="w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer"
                                src={closeIcon}
                                alt="close-modal"
                            />
                            <img
                                onClick={goBack}
                                className="bg-white p-4 rounded-full absolute top-[50%] left-[-20px] cursor-pointer transition-all hover:scale-150"
                                src={prevIcon}
                                alt="previous"
                            />
                            <img
                                onClick={goForward}
                                className="bg-white p-4 rounded-full absolute top-[50%] right-[-20px] cursor-pointer transition-all hover:scale-150"
                                src={nextIcon}
                                alt="next"
                            />
                        </div>
                        <div className="small-images flex mt-7 justify-around w-[400px]">
                            {data.map((img, idx) => (
                                <div key={img.id} className="single-image">
                                    <img
                                        onClick={() => setValue(idx)}
                                        className="w-[60px] cursor-pointer rounded-xl transition-all hover:border-[3px] border-orange"
                                        src={img.smallImg}
                                        alt="product-thumbnail"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="description p-6 md:basis-1/2 md:py-[40px]">
                    <p className="text-primary text-[14px] tracking-widest uppercase font-[700] mb-6">
                        Sneaker Company
                    </p>
                    <h1 className="text-3xl md:text-4xl capitalize font-[700]">
                        Fall Limited Edition Sneakers
                    </h1>
                    <p className="hidden md:block text-darkGrayishBlue my-10 leading-7">
                        These low-profile sneakers are your perfect casual wear companion.
                        Featuring a durable rubber outer sole, they'll withstand everything
                        the weather can offer.
                    </p>

                    <div className="price flex items-center">
                        <span className="text-3xl font-[700] mr-4">${fixedPrice}</span>
                        <span className="bg-paleOrange text-primary font-[700] py-1 px-2 rounded-lg">
                            -50%
                        </span>
                        <p className="md:hidden line-through text-grayishBlue font-[700] translate-x-[100px] mb-2">
                            $250.00
                        </p>
                    </div>
                    <p className="hidden md:block line-through text-grayishBlue font-[700] mt-2">
                        $250.00
                    </p>

                    <div className="buttons-container flex flex-col md:flex-row mt-8">
                        <div className="state w-[100%] flex justify-around md:justify-center items-center space-x-10 bg-lightGrayishBlue rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]">
                            <button
                                onClick={decreaseQty}
                                className="minus text-[24px] font-[700] text-orange transition-all hover:opacity-50"
                            >
                                -
                            </button>
                            <p className="md:text-[14px] font-bold text-black dark:text-black">{qty}</p>
                            <button
                                onClick={increaseQty}
                                className="plus text-[24px] font-[700] text-orange transition-all hover:opacity-50"
                            >
                                +
                            </button>
                        </div>
                        <button className="add-btn bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-[700] px-[70px] py-[18px] mt-4 md:mt-0 md:text-[14px] transition-all btn-shadow hover:opacity-50">
                            <img
                                className="inline-block -translate-x-2 -translate-y-[2px] h-[15px]"
                                src={cartIcon}
                                alt="cart-icon"
                            />
                            &nbsp;Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DetailProductPage;