import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MorePackage() {

     const location = useLocation();
      const [selectedImage, setSelectedImage] = useState(0);
      const [datas, setDatas] = useState(null); 
      const [images, setImages] = useState([]);
    
      useEffect(() => {
        if (location.state) {
          
          setDatas(location.state);
          setImages(location.state.images || []); 
        }
      }, [location.state]); 
      if (!datas) {
        return <div>Loading...</div>; 
      }
    
      const handleImageClick = (index) => {
        setSelectedImage(index);
      };
  return (
    <>
    <nav className="h-32 bg-slate-500"></nav>

    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        
        <div className="w-full md:w-1/2 p-4">
          <img
            src={images[selectedImage]}
            alt="Selected"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="flex mt-4 space-x-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-16 cursor-pointer rounded-lg shadow-lg ${
                  index === selectedImage ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

       
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 uppercase  text-amber-500">{datas.agencyId.companyName} company</h2>
            <h1 className="text-lg uppercase">to {datas.destination}</h1>
            <label className="block text-sm font-medium text-gray-700">{datas.packageDescription}</label>
               
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <p className="mt-1 text-lg font-semibold">${datas.payment
                }</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Members</label>
                <input
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number of members"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-row">

<div className="w-3/4 sm:w-1/2 md:w-1/2">
  <h3 className='text-slate-600'>Catogory </h3>
  <p>{datas.destinationCategory}
    
  </p>
</div>



</div>

<div className="mb-5 flex justify-center">
        <hr className= " mt-5 w-3/4" />
      </div>
      
      <div className="mt-8 p-4">
        <h2 className="text-3xl font-bold mb-4">About Company</h2>
        <p className="text-gray-700 text-2xl uppercase">{datas.agencyId.companyName
        } Company</p>
        <p className="text-gray-700 mt-2">ph: {datas.mobileNumber}
        </p>
        <p className="text-gray-700 ">{datas.companyDescription}
        </p>
      </div>
    </div>
    </>
  )
}

export default MorePackage

