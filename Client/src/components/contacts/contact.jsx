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

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/contact-us", formData);
      if (response.data.success) {
        setStatus("Message sent successfully!");
        toast.success(response.data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        setStatus(response.data.message || "Something went wrong!");
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      setStatus(error.response?.data?.message || "Error: Unable to send message.");
      toast.error(error.response?.data?.message || "Error: Unable to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or want to discuss a project? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
              
              {status && (
                <div className={`mb-6 p-4 rounded-lg ${status.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                  {status}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your 10-digit phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:from-blue-700 hover:to-indigo-800"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : "SEND MESSAGE"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8 rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="mt-1 opacity-90">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="mt-1 opacity-90">contact@effectiveeducation.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="mt-1 opacity-90">123 Education Street, Tech City, TC 54321</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                  <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                  <p className="opacity-90">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="opacity-90">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="opacity-90">Sunday: Closed</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-400 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Kadir Miya", role: "CEO & Founder", email: "miya@example.com", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" },
                { name: "Isabella Thompson", role: "CTO", email: "isabella@example.com", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" },
                { name: "Zainab Rahman", role: "Head of Education", email: "zainab@example.com", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" },
                { name: "Aiden Davis", role: "Product Director", email: "aiden@example.com", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="h-56 overflow-hidden">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium mt-1">{member.role}</p>
                    <p className="text-gray-600 mt-3">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;









// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import axiosInstance from "src/utils/axiosInstance";
// import Footer from "../footer/Footer";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({}); // To store validation errors
//   const [status, setStatus] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     // Clear the error for this field when the user starts typing
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const { name, email, phone, message } = formData;

//     if (!name.trim()) newErrors.name = "Name is required!";
//     if (!email.trim()) {
//       newErrors.email = "Email is required!";
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) newErrors.email = "Invalid email format!";
//     }
//     if (!phone.trim()) {
//       newErrors.phone = "Phone number is required!";
//     } else {
//       const phoneRegex = /^\d{10}$/;
//       if (!phoneRegex.test(phone)) newErrors.phone = "Phone number must be 10 digits!";
//     }
//     if (!message.trim()) newErrors.message = "Message is required!";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus(null);

//     if (!validateForm()) return; // Stop if validation fails

//     try {
//       const response = await axiosInstance.post("/contact-us", formData);
//       if (response.data.success) {
//         setStatus("Message sent successfully!");
//         toast.success(response.data.message || "Message sent successfully!");
//         setFormData({ name: "", email: "", phone: "", message: "" });
//         setErrors({}); // Clear errors after successful submission
//       } else {
//         setStatus(response.data.message || "Something went wrong!");
//         toast.error(response.data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       setStatus(error.response?.data?.message || "Error: Unable to send message.");
//       toast.error(error.response?.data?.message || "Error: Unable to send message.");
//     }
//   };

//   return (
//     <>
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 shadow-lg rounded-lg">
//             {status && (
//               <p className={`mb-4 text-center ${status.includes("Error") ? "text-red-600" : "text-green-600"}`}>
//                 {status}
//               </p>
//             )}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.name ? "border-red-500" : ""
//                   }`}
//                   placeholder="Enter your name"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700">Email</label>
//                 <input
//                   type="text"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.email ? "border-red-500" : ""
//                   }`}
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700">Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.phone ? "border-red-500" : ""
//                   }`}
//                   placeholder="Enter your phone"
//                 />
//                 {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700">Message</label>
//                 <textarea
//                   rows="4"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors.message ? "border-red-500" : ""
//                   }`}
//                   placeholder="Write your message"
//                 ></textarea>
//                 {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
//               </div>

//               <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 w-full">
//                 SEND
//               </button>
//             </form>
//           </div>

//           <div className="flex justify-center items-center">
//             <img src="https://source.unsplash.com/500x400/?office,team" alt="Office Team" className="rounded-lg shadow-lg" />
//           </div>
//         </div>
//       </div>


//       <div className="max-w-6xl mx-auto mt-16">
//         <h2 className="text-2xl font-semibold text-center mb-6">Our Team Heads</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {[{ name: "Kadir Miya", email: "miya@example.com", img: "https://randomuser.me/api/portraits/women/1.jpg" },
//             { name: "Isabella Thompson", email: "isabella@example.com", img: "https://randomuser.me/api/portraits/women/2.jpg" },
//             { name: "Zainab Rahman", email: "zainab@example.com", img: "https://randomuser.me/api/portraits/men/1.jpg" },
//             { name: "Aiden Davis", email: "aiden@example.com", img: "https://randomuser.me/api/portraits/men/2.jpg" }].map((member, index) => (
//             <div key={index} className="bg-white p-4 shadow-lg rounded-lg text-center">
//               <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full" />
//               <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
//               <p className="text-gray-600">{member.email}</p>
//             </div>
//           ))}
//         </div>
//       </div>
     
//       {/* <footer className="mt-16 bg-indigo-900 text-white py-6 text-center">
//         Effective Education | Contact: tripeazy@gmail.com
//       </footer> */}
//     </div>
//      <Footer/>
//      </>
//   );
// };

// export default Contact;
