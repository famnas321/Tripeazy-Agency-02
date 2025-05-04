import React, { useEffect, useRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const DeleteSuccessPage = () => {
  const checkmarkRef = useRef(null);

  useEffect(() => {
    
    const checkmark = checkmarkRef.current;
    if (checkmark) {
      checkmark.style.transform = 'scale(0)';
      checkmark.style.transition = 'none';
      
     
      setTimeout(() => {
        checkmark.style.transition = 'transform 0.6s ease-in-out';
        checkmark.style.transform = 'scale(1)';
      }, 50);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div className="relative">
        <CheckCircleIcon 
          ref={checkmarkRef}
          className="h-16 w-16 text-green-500 mb-4"
          style={{
            transformOrigin: 'center',
            opacity: 0.9,
          }}
        />
        
        <svg
          className="absolute top-0 left-0 h-16 w-16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 13L10 16L17 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="24"
            strokeDashoffset="24"
            style={{
              animation: 'draw 0.6s ease-in-out forwards',
              animationDelay: '0.3s'
            }}
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Your Package was successfully deleted.
      </h1>
      <p className="text-gray-600 mt-2">You can now safely return to the post page or continue browsing.</p>
      <a
        href="/posts"
        className="mt-6 inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        Go to posts
      </a>

      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteSuccessPage;