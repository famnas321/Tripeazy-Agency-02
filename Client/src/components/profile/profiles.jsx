import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import CommonNav from "../navbar/commonNav";
import axiosInstance from "src/utils/axiosInstance";
const Profiles = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [errors, setErrors] = useState({});
  const [Profile, setProfile] = useState({
    companyName: "",
    email: "",
    registrationId: "",
    contactNO: "",
    nameOfManager: "",
    countryname: "",
    stateName: "",
    cityName: "",
  });

  useEffect(()=>{

    const fetchAgency = async ()=>{
      try {
        const response = await axiosInstance.get("/profile");
        setProfile(response.data)
         console.log(response.data,"from backend agency details")
      } catch (error) {
        
      }
    }

    fetchAgency();
  },[])

 

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateFields = () => {
    let tempErrors = {};

    if (!Profile.companyName) tempErrors.companyName = "Company name is required";
    if (!Profile.email) tempErrors.email = "email is required";
    if (!Profile.registrationId) tempErrors.registrationId = "registrationId is required";
    if (!Profile.city) tempErrors.city = "city is required";
    if (!Profile.nameOfManager) tempErrors.nameOfManager = "name of manager is required";
    if (!Profile.country) tempErrors.country = "Country is required";
    if (!Profile.state) tempErrors.state = "State is required";
    if (!Profile.phone) {
      tempErrors.phone = "phone number is required";
    } else if (Profile.phone.length !== 10) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateFields()) {
      // try {
      //   const { data } = await axios.put(
      //     // `${API_BASE_URL}/api/auth/profile`,
      //     Profile,
      //     { withCredentials: true }
      //   );

     
      //   dispatch(setUserInfo(data.user));
      //   toast.success("Profile details submitted successfully!");
      // } catch (error) {
      //   if (error.response?.data?.message === "Phone number already exists") {
      //     setErrors((prev) => ({
      //       ...prev,
      //       phone: error.response.data.message,
      //     }));
      //   } else {
      //     toast.error("Failed to update profile");
      //   }
      // }
    }
  };


  //  const response = await axios.get(`${API_BASE_URL}/api/auth/logout`,{
  //     withCredentials:true
  //   })
  //   if(response.status === 200){
  //     console.log('set nigga');
  //     dispatch(setUserInfo(undefined));
  //     navigate("/login")
  //   }
  // }
  const handleImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "profile");
  
    setLoading(true);
    try {
      const response = await axios.post(
        // `${API_BASE_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        const imageUrl = response.data.imageUrl;
        dispatch(setUserInfo({ ...userinfo, image: imageUrl }));
        setImage(imageUrl);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };
  //   const logOut = async ()=>{
 
  const deleteImage = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/delete`,
        {
          withCredentials: true,
          data: {
            image: image, // Include the image URL
            type: "profile", // Specify the type
          },
        }
      );
  
      if (response.status === 200) {
        dispatch(setUserInfo({ ...userinfo, image: null }));
        setImage(null);
        toast.success("Image deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles height="50" width="50" color="#4fa94d" ariaLabel="loading" visible={true} />
      </div>
    );
  }

  return (
    <>
    <CommonNav/>
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-700">
            Welcome, {Profile.companyName} {Profile.lastName}
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg mt-6 p-6 flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <div
            className="h-full w-24 md:w-32 md:h-32 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-24 w-24 md:w-32 md:h-32 rounded-full overflow-hidden">

              {/* {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div className="uppercase h-24 w-24 md:w-32 md:h-32 text-5xl border-[1px] flex items-center justify-center">
                  {Profile.firstName
                    ? Profile.firstName.split("").shift()
                    : Profile.email.split("").shift()}
                </div>
              )} */}
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
                // onClick={image ? deleteImage : () => fileInputRef.current.click()}
              >
                {/* {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )} */}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImage}
              name="profile-image"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
            />
          </div>
          <h3 className="text-lg font-semibold mt-4">
            {Profile.companyName} <span>{Profile.lastName}</span>
          </h3>
         
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Company Name:
            </label>
            <input
              type="text"
              name="companyName"
              value={Profile.companyName}
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={Profile.email}
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Registration ID:
            </label>
            <input
              type="text"
              name="registrationId"
              value={Profile.registrationId}
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              value={Profile.contactNO
              }
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Name of Manager:
            </label>
            <input
              type="text"
              name="nameOfManager"
              value={Profile.nameOfManager}
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Country:
            </label>
            <input
              type="tel"
              name="country"
              value={Profile.countryname}
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              State:
            </label>
            <input
              type="text"
              name="state"
              value={Profile.stateName}
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              City:
            </label>
            <input
              type="text"
              name="city"
              value={Profile.cityName}
              onChange={handleFieldChange}
              className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 m-2"
          >
            Save
          </button>
          <button
          // onClick={logOut}
            className="bg-red-600 text-white px-4 py-2 rounded mt-4 m-2"
          >
            Logout
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default Profiles;