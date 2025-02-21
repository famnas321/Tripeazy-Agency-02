import React from 'react'

function Pending() {
  return (
    <div>
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
    
    
    
        <div className="relative bg-white p-10 shadow-2xl rounded-lg max-w-md text-center flex flex-col items-center">
  <img
    src="/status-waiting-svgrepo-com.svg"
    alt=""
    className="w-20 h-20 mb-4"
  />

      <h1 className="text-4xl font-bold text-cyan-800">WAIT FOR APPROVAL</h1>
      <p className="text-gray-700 mt-4 text-lg">
        Your Registration was succesfull 👍

      </p>
      <p>
        Please wait for admin approval <br />
         Don't forget your password and Email <br /> We  will send Email to you
      </p>

      
      {/* <div className="mt-6">
        <button
          onClick={() => window.location.href = '/'} 
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Go Back to Home
        </button>
      </div> */}
    </div>
  </div>
    </div>
  )
}

export default Pending