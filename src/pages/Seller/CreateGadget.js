import React, { useState } from 'react';
import options from './Data'; // Import the data

const CreateGadget = () => {
  const [levels, setLevels] = useState([{ level: 1, value: '' }]);
  const [formData, setFormData] = useState({});

  const handleChange = (levelIndex, value) => {
    const updatedLevels = [...levels];
    updatedLevels[levelIndex].value = value;

    // If a level is selected, add the next level
    if (options[levelIndex + 2] && options[levelIndex + 2][value]) {
      // Remove levels beyond the current one
      setLevels(updatedLevels.slice(0, levelIndex + 1));

      // Add a new level
      setLevels((prev) => [
        ...prev,
        { level: levelIndex + 2, value: '' },
      ]);
    } else {
      setLevels(updatedLevels.slice(0, levelIndex + 1));
    }

    // Update formData with the selected value
    setFormData({
      ...formData,
      [`level${levelIndex + 1}`]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    console.log('Form data submitted:', formData);

    // Perform form submission actions here, such as sending data to an API
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Gadget</h1>
      {levels.map((levelObj, index) => (
        <div key={index}>
          <label>Level {levelObj.level}:</label>
          <select
            value={levelObj.value}
            onChange={(e) => handleChange(index, e.target.value)}
            required
          >
            <option value="">Select...</option>
            {index === 0
              ? options[1].map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))
              : options[index + 1][levels[index - 1].value]?.map(
                  (option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  )
                )}
          </select>
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateGadget;
