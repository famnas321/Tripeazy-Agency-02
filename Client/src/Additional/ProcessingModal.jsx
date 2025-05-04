import React from "react";

const ProcessingModal = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative text-center shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Processing Your Package</h2>
        <p className="text-gray-600 mb-8">Please wait while we submit your package details...</p>
      </div>
    </div>
  );
};

export default ProcessingModal;