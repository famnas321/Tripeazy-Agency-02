import React from 'react';

import { deletePackage } from 'src/services/authService';
const DeletePackage = ({ isOpen, onClose, onDelete }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
              alt="Delete"
              className="w-6 h-6"
            />
          </div>
        </div>

       
        <h2 className="text-lg font-semibold text-center">Confirm Delete</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Are you sure you wanna delete your package? This action cannot be undone.
        </p>

       
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePackage;
