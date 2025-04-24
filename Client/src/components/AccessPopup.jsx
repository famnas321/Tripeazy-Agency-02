import React, { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

function AccessPopup({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  
  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsExiting(true);
   
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isExiting ? 'opacity-0' : isVisible ? 'opacity-30 backdrop-blur-sm' : 'opacity-0'
        }`}
      ></div>
      
      <div
        className={`bg-white rounded-lg shadow-xl w-96 max-w-md relative z-10 overflow-hidden transition-all duration-300 ease-in-out ${
          isExiting ? 'opacity-0 scale-95 translate-y-4' : 
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`p-2 bg-amber-100 rounded-full transition-all duration-500 delay-150 ${
              isVisible && !isExiting ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}>
              <AlertTriangle size={24} className="text-amber-600" />
            </div>
            
            <div className="flex-1">
              <h2 className={`text-lg font-semibold text-gray-900 mb-1 transition-all duration-300 delay-100 ${
                isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                Access Restricted
              </h2>
              <p className={`text-gray-600 text-sm mb-6 transition-all duration-300 delay-200 ${
                isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                You have not accessed these pages. Please wait for administrator approval.
              </p>
              
              <div className={`flex justify-end space-x-3 transition-all duration-300 delay-300 ${
                isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
                >
                  Cancel
                </button> */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  Okey! I'll Wait 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessPopup;