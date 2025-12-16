import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true); // Start open since parent controls visibility
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
      navigate("/posts");
    }, 300); // Match this with your longest animation duration
  };

  return (
    <div 
      className={`fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
        className={`bg-white rounded-2xl p-8 w-full max-w-md relative text-center shadow-xl transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Checkmark icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Package Added!
        </h2>
        
        {/* Message */}
        <p className="text-gray-600 mb-8">
          Your Package Successfully Placed!
        </p>
        
        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-200"
          >
            Add More Packages
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 text-green-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Go to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;