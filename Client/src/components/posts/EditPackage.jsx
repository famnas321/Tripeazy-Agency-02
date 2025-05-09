import { form } from "@heroui/theme";
import React, { useState } from "react";

const EditPackage = ({ isOpen, onClose,datas }) => {
  const [formData, setFormData] = useState(datas);
  // console.log(formData,"this data is from ed")
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    onClose(); // close from parent
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Enter Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Package Description</label>
          <textarea
            type="text"
            name="name"
            
            value={formData.packageDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-3 border rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              
              className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;
