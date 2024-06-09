import React, { useState } from 'react';
import './DataInputForm.css'; // Import CSS file for styling

function DataInputForm() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/employees/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputData: inputValue }) // Corrected data name
      });
      const data = await response.json();
      setResponseData(data.message); // Set only the message from the response
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="form-container"> {/* Apply container class */}
      <form onSubmit={handleSubmit} className="input-form"> {/* Apply input form class */}
        <label htmlFor="dataInput">Enter Data:</label>
        <input
          type="text"
          id="dataInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-field" 
        />
        <button type="submit" className="submit-button">Submit</button> {/* Apply submit button class */}
      </form>
      {error && <div>Error: {error}</div>}
      {responseData && (
        <div>
          <h2>Response:</h2>
          <p>{responseData}</p> {/* Display only the message */}
        </div>
      )}
    </div>
  );
}

export default DataInputForm;
