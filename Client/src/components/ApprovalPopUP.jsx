import React, { useEffect, useState } from "react";

 import { useNavigate } from "react-router-dom";
const SuccessModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate= useNavigate()
  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    
    setTimeout(onClose, 300);
    navigate("/posts")
  };

  return (
    <div 
      className={`fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div 
        className={`bg-white rounded-2xl p-8 w-full max-w-md relative text-center shadow-xl transform transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
       
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        
        <div className="flex justify-center mb-6">
          <div className={`bg-green-100 p-4 rounded-full transform transition-all duration-500 ${
            isOpen ? "scale-100 rotate-0" : "scale-0 rotate-90"
          }`}>
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
                className={`transition-all duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`}
              />
            </svg>
          </div>
        </div>
        
        
        <h2 className={`text-2xl font-bold mb-3 text-gray-800 transition-all duration-300 delay-100 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
         Booking Placed!
        </h2>
        
        
        <p className={`text-gray-600 mb-8 transition-all duration-300 delay-200 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
         Your Booking Successfully Placed , Agency Will Contact you!
        </p>
        
       
        <div className={`flex justify-center gap-6 transition-all duration-300 delay-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
          <button 
            className="px-4 py-2 text-gray-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-200"
          >
            View Details
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 text-green-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
             Explore Other Packages
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;