// src/TextUpload.js

import React, { useState } from 'react';
import axios from 'axios';

function TextUpload({ authToken }) {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/upload', { text }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log(response.data);
      setMessage('Text uploaded successfully');
    } catch (error) {
      console.error('Error uploading text:', error);
      setMessage('Text upload failed');
    }
  };

  return (
    <div>
      <h2>Text Upload</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <button type="submit">Upload Text</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default TextUpload;
