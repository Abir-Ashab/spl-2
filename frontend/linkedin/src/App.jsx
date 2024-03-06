import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import LandingPage from './components/landingpage'; 
import CreatePostForm from './components/CreatePostForm';

function App() {
  const [posts, setPosts] = useState([]);

  const handlePostCreated = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/CreatePost"
            element={<CreatePostForm onPostCreated={handlePostCreated} posts={posts} />}
          />
        </Routes>
        {/* <img src="/pic.png" alt="LinkedIn Logo" className="fixed w-35 h-12 ml-40 top-4 left-4 z-50" /> */}
      </div>
    </Router>
  );
}

export default App;
