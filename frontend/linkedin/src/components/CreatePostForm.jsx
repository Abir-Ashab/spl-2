import React, { useState } from 'react';

function CreatePostForm({ onPostCreated, posts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate post creation by constructing a new post object
    const newPost = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      title,
      content,
      image: image ? URL.createObjectURL(image) : null // Convert image to data URL if available
    };
    // Pass the new post to the parent component
    onPostCreated(newPost);
    // Clear the form fields
    setTitle('');
    setContent('');
    setImage(null);
    setMessage('Post created successfully');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full mb-4 p-2 border rounded-md" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows="4" className="w-full mb-4 p-2 border rounded-md" required></textarea>
        <input type="file" onChange={handleImageChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create Post</button>
      </form>
      {message && <p className="mt-2">{message}</p>}

      {/* Render posts */}
      <div className="mt-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 shadow-md rounded-md mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className="mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatePostForm;
