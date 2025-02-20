import React from 'react'
import { useState } from 'react';
function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
        companyName:"",
        nameOfManager:"",
        contactNO:"",
        registrationId:"",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center h-screen">
        <div className="bg-white flex  rounded-2xl shadow-lg w-3/4 p-5 items-center h-5/6">
        <div className="md:w-1/2 px-8 md:px-16">
        <form className="max-w-sm mx-auto rounded-lg shadow-xl overflow-hidden p-6 space-y-10">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="username"
    name="username"
    id="username"
    value={formData.username}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="password"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
      ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
  >
    User Name
  </label>
</div>


      
      <div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="text"
    name="email"
    id="email"
    value={formData.email}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="password"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
      ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
  >
    Email
  </label>
</div>


      
      <div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="password"
    name="password"
    id="password"
    value={formData.password}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="password"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
      ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
  >
    Password
  </label>
</div>
   
<div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="confirmPassword"
    name="confirmPassword"
    id="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="confirmPassword"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
      ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
  >
  Confirm Password
  </label>
</div>

    </form>
    
        </div>

        <div className="md:w-1/2 px-8 md:px-16 bg-blue-950">

        <form className="max-w-sm mx-auto rounded-lg shadow-xl overflow-hidden p-6 space-y-10">
      <h2 className="text-2xl font-bold text-center text-white">Company Detailes</h2>

      <div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="companyName"
    name="companyName"
    id="companyName"
    value={formData.companyName}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="companyName"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white
      ${formData.password ? '-top-4 text-sm text-white' : ''}"
  >
    Company Name
  </label>
</div>


      
      <div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="nameOfManager"
    name="nameOfManager"
    id="nameOfManager"
    value={formData.nameOfManager}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="nameOfManager"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white 
      ${formData.password ? '-top-4 text-sm text-white' : ''}"
  >
    Name of Manager
  </label>
</div>


      
      <div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="contactNO"
    name="contactNO"
    id="contactNO"
    value={formData.contactNO}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="contactNO"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white
      ${formData.password ? '-top-4 text-sm text-white : ''}"
  >
    Contact Number
  </label>
</div>
   
<div className="relative border-b-2 focus-within:border-blue-500">
  <input
    type="registrationId"
    name="registrationId"
    id="registrationId"
    value={formData.registrationId}
    onChange={handleChange}
    className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
    placeholder=" " 
  />
  <label
    htmlFor="registrationId"
    className=" absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white 
      ${formData.password ? '-top-4 text-sm text-white' : ''}"
  >
  Registration Id
  </label>
</div>

    </form>
    
        </div>

        </div>
        
    </div>
  )
}

export default Register