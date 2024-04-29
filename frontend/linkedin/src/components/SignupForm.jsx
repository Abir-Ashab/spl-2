import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const history = useHistory(); // Initialize useHistory

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => { // Move handleSubmit inside the component
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      console.log(response.data);
      setMessage('Signup successful');
      history.push('/login'); // Navigate to login page upon successful signup
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Signup failed');
    }
  };

  useEffect(() => {
    // No need to call handleSubmit here; it will be called when the form is submitted
  }, []); // Empty dependency array means this effect only runs once, when the component mounts

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Make the most of your professional life</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="mb-4 border rounded-md px-3 py-2 w-full" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-4 border rounded-md px-3 py-2 w-full" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="mb-4 border rounded-md px-3 py-2 w-full" required />
        <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white py-4 px-16 rounded-md hover:bg-blue-600">Agree and Join</button>
        </div>
      </form>
      <Link to="/login" className="flex justify-center mt-10">Already on LinkedIn?
        <p className="text-blue-600"> Sign in</p>
      </Link>
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default SignupForm;
