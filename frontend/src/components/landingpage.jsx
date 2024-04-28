import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faUser, faBook, faEnvelope, faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import all icons at once

function LandingPage() {
  return (
    <div>
      <div className="flex justify-end items-center space-x-20 py-4 mr-4">
        <div>
          <FontAwesomeIcon icon={faNewspaper} className="w-10 h-6" /> <p>Articles</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faUser} className="w-10 h-6" /> <p>People</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faBook} className="w-10 h-6" /> <p>Learning</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} className="w-10 h-6" /> <p>Job Posts</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faCartShopping} className="w-10 h-6" /> <p>Get the app</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-3xl font-semibold mb-4 text-center">Welcome to your professional community</h2>
          <Link to="/login" className="block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Sign in
          </Link>
        </div>
        <img src="/manush.svg" alt="manush" className='ml-20 flex justify-end mt-20 h-110 w-70 rounded-full' />
      </div>
    </div>
  );
}
export default LandingPage;
