import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { NavLink } from 'react-router-dom';

import EditPackage from './EditPackage';
import DeletePackage from './DeletePackage';
import CrudPopUp from 'src/Additional/CrudPopUp';
import ReviewSection from './Reviews';
import { PostBookings } from 'src/services/authService';
import SuccessModal from '../ApprovalPopUP';
import { deletePackage } from 'src/services/authService';
import toast from 'react-hot-toast';
function MorePackage() {
  const navigate= useNavigate()
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [datas, setDatas] = useState(null);
  const [images, setImages] = useState([]);
  // const [members, setMembers] = useState();
  // const [day, setDay] = useState();
  // const [night, setNight] = useState();
  // const [date, setDate] = useState();
  // const [mobileNumber, setMobileNumber] = useState();
  const [errors, setErrors] = useState({});
  const [showPopup,setShowPopup]= useState(false)
  const[crudPopup,setCrudPopup]=useState(false)
  const [showDeletePop,setShowDeletePop] =useState(false)
  const [selectedPackageId,setSelectedPackageId]= useState()
  const [showEditPopup,setShowEditPopup]= useState(false)
  useEffect(() => {
    if (location.state) {
      setDatas(location.state);
      setImages(location.state.images || []);
    }
  }, [location.state]);

  if (!datas) {
    return <div>Loading...</div>;
  }

  // const validate = () => {
  //   let errors = {};

  //   if (!members) {
  //     errors.members = "*Please enter members";
  //   }

  //   if (!mobileNumber) {
  //     errors.mobileNumber = "*Mobile number required";
  //   } else if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
  //     errors.mobileNumber = "*Mobile number must be 10 characters";
  //   }

  //   if (Object.keys(errors).length > 0) {
  //     setErrors(errors);
  //     return false;  
  //   }
  //   setErrors({});
  //   return true;  
  // };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  // const handlebooking = async (postId) => {
  //   if (!validate()) {
  //     return;  
  //   }
  //   // console.log(postId,"this is post id ")
  //   const bookingData= {
  //  members,   
  //  day,
  //  night,
  //  mobileNumber,
  //  postId,
  //  date,
  //  role:"Agency",
  //  type:"Package",
  //  status:"Pending",

  //   }
  //   // console.log("bookingdata is ",bookingData)    
  //  try{
  //   const response = await PostBookings(bookingData)
  //   if(response){
  //     console.log(response,"Booked succussfully")
  //     setShowPopup(true)
  //   }
   
  //  }catch(error){
  //  console.log(error,"error while booking")
  //  }
  // };
const handleAction =  (type,packageId)=>{
  console.log(type,"this is action type")
  console.log(packageId,"this is id of the post ")
  if(type==="delete"){
    setShowDeletePop(true)
    setSelectedPackageId(packageId)
    return
  } 
  if(type=== "edit"){
  setShowEditPopup(true)
  }
}

const handleDelete = async ()=>{
      
      const packageId= selectedPackageId
      console.log(packageId,"this is selected package id ")
      try{
       const response= await deletePackage(packageId)
       console.log(response)
       if(response){
        navigate("/posts/deleteSuccession")
       }
      }catch(error){
       console.log(error)
       toast.error("An Error occured")
      }
}
// console.log(datas,"this is datas for aligning")
  return (
    <>
      <nav className="h-16 shadow-md bg-white sticky top-0 z-50 flex items-center justify-between px-4">
        <NavLink
          to="/posts"
          className="flex items-center gap-1 bg-blue-900 text-white px-4 py-1 rounded-full text-sm sm:text-base font-medium hover:bg-blue-600 transition duration-300"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline font-light text-sm">Back</span>
        </NavLink>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap">
            More Package Info
          </h1>
        </div>

        <div className="w-[100px] sm:w-[144px]"></div>
      </nav>

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
            <div className="w-3/4 sm:w-1/2 md:w-1/2">
              <h3 className="text-slate-600">Category</h3>
              <p>{datas.destinationCategory}</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4">
          {/* <p className='text-right text-4xl mr-5'>...</p> */}
          <div className='flex justify-end'>
          <CrudPopUp onAction={(type)=>handleAction(type,datas._id)}/>
          </div>
          
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 uppercase text-amber-500">{datas.agencyId.companyName} company</h2>
              <h1 className="text-lg uppercase">to {datas.destination}</h1>
              <label className="block text-sm font-medium text-gray-700">{datas.packageDescription}</label>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <p className="mt-1 text-lg font-semibold">${datas.payment}</p>
                  <p className="text-gray-600 text-xs">The price may change based on your requirements</p>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Members</label>
                  <input
                    type="number"
                    min="0"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of members"
                  />
                  {errors.members && <p className="text-red-500 text-xs">{errors.members}</p>}
                </div> */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                   
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="pic the data"
                  />
                  
                </div> */}
                {/* <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Day</label>
                    <input
                      type="number"
                      min="0"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter days"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Night</label>
                    <input
                      type="number"
                      min="0"
                      value={night}
                      onChange={(e) => setNight(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter nights"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
                </div>
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={()=>handlebooking(datas._id)}
                >
                  Book Now
                </button> */}
              
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex justify-center">
          <hr className="mt-5 w-3/4" />
        </div>

        <div className="mt-8 p-4">
          <h2 className="text-3xl font-bold mb-4">About Company</h2>
          <p className="text-gray-700 text-2xl uppercase">{datas.agencyId.companyName} Company</p>
          <p className="text-gray-700 mt-2">ph: {datas.mobileNumber}</p>
          <p className="text-gray-700">{datas.companyDescription}</p>
        </div>
      </div>

      <ReviewSection />
      {showPopup && 
  <SuccessModal
    onClose={() => setShowPopup(false)}
  />
}
{showDeletePop && (
  <DeletePackage
    isOpen={showDeletePop}
    onClose={() => setShowDeletePop(false)}
    onDelete={handleDelete}
  />
)}
  <EditPackage
        isOpen={showEditPopup}
        datas={datas}
        onClose={() => setShowEditPopup(false)}
      />


    </>
  );
}

export default MorePackage;
