import React, { useState } from 'react';
import './DataInputForm.css'; // Import CSS file for styling

function DataInputForm() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/v1/resume/chatbot', {
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
        <label htmlFor="dataInput"><h4>WHAT DO YOU WANT?</h4></label>
        <input
          type="text"
          id="dataInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-field" 
        />
        <button type="submit" className="submit-button">Submit</button> {/* Apply submit button class */}
      </form>
      {error && <div className="error-message">Error: {error}</div>}
      {responseData && (
        <div className="response-container">
          <ul className="response-list">
            <p>{responseData}</p>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DataInputForm;
