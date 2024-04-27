import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log(response.data);
      setMessage('login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed');
    }
  };
 
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-left">Sign in</h2>
      <p className="text-left">Stay updated on your professional world</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 border rounded-md px-3 py-2 w-full" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 border rounded-md px-3 py-2 w-full" />
        <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 text-white py-4 px-16 rounded-md hover:bg-blue-600">Sign in</button>
        </div>
      </form>
      <Link to="/signup" className="flex justify-center mt-10">New to linkedin?
        <p className="text-blue-600"> Sign up</p>
      </Link>
      {/* <Link to="/CreatePost">{message}</Link> */}
      <div>
        {message ? (
          <Link to="/CreatePost"><button type="submit" className="bg-blue-500 text-white py-4 px-16 rounded-md hover:bg-blue-600">click here to post</button></Link>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
export default LoginForm;