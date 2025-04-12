import React from "react";
import { X, AlertTriangle } from "lucide-react";

function AccessPopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose} // Clicking outside closes the popup
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="bg-white rounded-lg shadow-xl w-96 max-w-md relative z-10 overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-amber-100 rounded-full">
              <AlertTriangle size={24} className="text-amber-600" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Access Restricted
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                You have not accessed these pages. Please wait for administrator approval.
              </p>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  Acknowledge
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
