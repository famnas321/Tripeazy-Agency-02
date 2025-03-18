import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "src/utils/axiosInstance";
import Footer from "../footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({}); // To store validation errors
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear the error for this field when the user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, phone, message } = formData;

    if (!name.trim()) newErrors.name = "Name is required!";
    if (!email.trim()) {
      newErrors.email = "Email is required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format!";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required!";
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) newErrors.phone = "Phone number must be 10 digits!";
    }
    if (!message.trim()) newErrors.message = "Message is required!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await axiosInstance.post("/contact-us", formData);
      if (response.data.success) {
        setStatus("Message sent successfully!");
        toast.success(response.data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({}); // Clear errors after successful submission
      } else {
        setStatus(response.data.message || "Something went wrong!");
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setStatus(error.response?.data?.message || "Error: Unable to send message.");
      toast.error(error.response?.data?.message || "Error: Unable to send message.");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            {status && (
              <p className={`mb-4 text-center ${status.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                {status}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your phone"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  placeholder="Write your message"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 w-full">
                SEND
              </button>
            </form>
          </div>

          <div className="flex justify-center items-center">
            <img src="https://source.unsplash.com/500x400/?office,team" alt="Office Team" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold text-center mb-6">Our Team Heads</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ name: "Kadir Miya", email: "miya@example.com", img: "https://randomuser.me/api/portraits/women/1.jpg" },
            { name: "Isabella Thompson", email: "isabella@example.com", img: "https://randomuser.me/api/portraits/women/2.jpg" },
            { name: "Zainab Rahman", email: "zainab@example.com", img: "https://randomuser.me/api/portraits/men/1.jpg" },
            { name: "Aiden Davis", email: "aiden@example.com", img: "https://randomuser.me/api/portraits/men/2.jpg" }].map((member, index) => (
            <div key={index} className="bg-white p-4 shadow-lg rounded-lg text-center">
              <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full" />
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.email}</p>
            </div>
          ))}
        </div>
      </div>
     
      {/* <footer className="mt-16 bg-indigo-900 text-white py-6 text-center">
        Effective Education | Contact: tripeazy@gmail.com
      </footer> */}
    </div>
     <Footer/>
     </>
  );
};

export default Contact;
