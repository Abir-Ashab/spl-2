import React, { useState } from 'react';
import './DataInputForm.css'; // Import CSS file for styling

function DataInputForm({ inputValue }) {
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
        body: JSON.stringify({ inputData: inputValue }) // Use inputValue prop directly
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
        <input
          type="text"
          value={inputValue + " Enthuciastics Emails"} 
          readOnly // Make input read-only if it's a controlled input from parent
          className="input-field" 
        />
        <button type="submit" className="submit-button">FIND</button> 
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
