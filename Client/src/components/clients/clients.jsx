
import React from 'react';

function Clients() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-500 hover:shadow-2xl">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-indigo-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Client List is Empty</h2>
        <p className="text-gray-600 mb-6">Add clients to see them beautifully displayed here.</p>
       
      </div>
    </div>
  );
}

export default Clients