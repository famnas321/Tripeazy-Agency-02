import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Country, State, City } from "country-state-city";
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Register() {
  const navigate = useNavigate();

  const [contries, setContries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedContry, setSelectedContry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errors,setErrors] = useState({});

  const imageRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    nameOfManager: "",
    contactNO: "",
    registrationId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContryChange = (country) => {
    setSelectedContry(country);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCities([]);
  };

  const handleStatehange = (state) => {
    setSelectedState(state);
    if (selectedContry) {
      setCities(City.getCitiesOfState(selectedContry.isoCode, state.isoCode));
    }
  };

  const handleCityhange = (city) => {
    setSelectedCity(city.target.value);
  };

  const handleClick = (e) => {
    imageRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.companyName) {
      newErrors.companyName = "*Company Name is required";
    }
    if (!formData.email) {
      newErrors.email = "*Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter the valid Email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.contactNO) {
      newErrors.contactNO = "Contact Number is required";
    } else if (!/^\d{10}$/.test(formData.contactNO)) {
      newErrors.contactNO = "Enter valid Contact Number";
    }
    if (!formData.registrationId) {
      newErrors.registrationId = "Registration Id is Required";
    }
    if (!formData.nameOfManager) {
      newErrors.nameOfManager = "Manager Name is Required";
    }
    if (!selectedContry) {
      newErrors.country = "*Required field";
    }
    if (!selectedState) {
      newErrors.state = "*Required field";
    }
    if (!selectedCity) {
      newErrors.city = "*Required field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const updatedFormData = {
      ...formData,
      countryname: selectedContry?.name || "Unknown",
      stateName: selectedState?.name || "Unknown",
      cityName: selectedCity || "Unknown",
    };
     console.log(updatedFormData)
    try {
      const response = await register(updatedFormData);
      if (response) {
        navigate("/pending");
      }
    } catch (error) {
      console.error("Registration fail");
    }
  };

  useEffect(() => {
    console.log(errors, "errors are");
  }, [errors]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-white flex flex-col md:flex-row rounded-4xl shadow-xl w-full max-w-6xl">
       
        <div className="w-full md:w-1/2 px-4 md:px-8 py-6">
          <form className="space-y-6">
            <h2 className="text-2xl font-bold text-center">REGISTRATION</h2>
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="inline-block w-16 h-16 bg-gray-100 rounded-full overflow-hidden" onClick={handleClick}>
                {profilePic ? (
                  <img src={profilePic} className="w-full h-full rounded-full object-cover border-2 border-gray-300" alt="" />
                ) : (
                  <img src="user-profile-svgrepo-com.svg" className="w-full h-full rounded-full object-cover border-2 border-gray-300" alt="Profile" />
                )}
              </span>
              <p>Add Profile</p>
              <input type="file" ref={imageRef} onChange={handleImageChange} className="hidden" />
            </div>
            <div className="space-y-4">
              <div className="relative border-b-2 focus-within:border-blue-500">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="  w-full appearance-none focus:outline-none bg-transparent p-2 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="companyName"
                  className="-mt-3 absolute left-2 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  {errors.companyName && !formData.companyName ? <p className="text-red-600">{errors.companyName}</p> : "Company Name"}
                </label>
              </div>
              <div className="relative border-b-2 focus-within:border-blue-500">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" w-full appearance-none focus:outline-none bg-transparent p-2 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className=" -mt-3 absolute left-2 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500 "
                >
                  {errors.email ? <p className="text-red-600">{errors.email}</p> : "Email"}
                </label>
              </div>
              <div className="relative border-b-2 focus-within:border-blue-500">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full appearance-none focus:outline-none bg-transparent p-2 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className=" -mt-3 absolute left-2 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  {errors.password ? <p className="text-red-600">{errors.password}</p> : "Password"}
                </label>
              </div>
              <div className="relative border-b-2 focus-within:border-blue-500">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full appearance-none focus:outline-none bg-transparent p-2 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className=" -mt-3 absolute left-2 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  {errors.confirmPassword ? <p className="text-red-600">{errors.confirmPassword}</p> : "Confirm Password"}
                </label>
              </div>
              <div className="relative border-b-2 focus-within:border-blue-500">
                <input
                  type="text"
                  name="nameOfManager"
                  id="nameOfManager"
                  value={formData.nameOfManager}
                  onChange={handleChange}
                  className="w-full appearance-none focus:outline-none bg-transparent p-2 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="nameOfManager"
                  className=" -mt-3 absolute left-2 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500"
                >
                  {errors.nameOfManager && !formData.nameOfManager ? <p className="text-red-600">{errors.nameOfManager}</p> : "Name of Manager"}
                </label>
              </div>
            </div>
          </form>
        </div>

       
        <div className="w-full md:w-1/2 px-4 md:px-8 py-6 bg-blue-950 rounded-b-4xl md:rounded-r-4xl md:rounded-bl-none">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <h2 className="text-2xl font-bold text-center text-white">COMPANY DETAILS</h2>
            <div className="space-y-4">
              <div className="relative border-b-2 focus-within:border-blue-500">
                <input
                  type="text"
                  name="contactNO"
                  id="contactNO"
                  value={formData.contactNO}
                  onChange={handleChange}
                  className="w-full appearance-none focus:outline-none bg-transparent p-2 peer text-white"
                  placeholder=" "
                />
                <label
                  htmlFor="contactNO"
                  className=" -mt-3 absolute left-2 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-white"
                >
                  {errors.contactNO ? <p className="text-red-600">{errors.contactNO}</p> : "Contact Number"}
                </label>
              </div>
              <div className="relative border-b-2 focus-within:border-blue-500">
                <input
                  type="text"
                  name="registrationId"
                  id="registrationId"
                  value={formData.registrationId}
                  onChange={handleChange}
                  className="w-full appearance-none focus:outline-none bg-transparent p-2 peer text-white"
                  placeholder=" "
                />
                <label
                  htmlFor="registrationId"
                  className=" -mt-3 absolute left-2 transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-white"
                >
                  {errors.registrationId && !formData.registrationId ? <p className="text-red-600">{errors.registrationId}</p> : "Registration Id"}
                </label>
              </div>
              <div className="relative">
                <span className="text-white">Select Country</span>
                <select
                  className="w-full mt-2 p-2 bg-transparent border-b-2 focus:outline-none focus:border-blue-500 text-white"
                  onChange={(e) => handleContryChange(contries.find((c) => c.isoCode === e.target.value))}
                >
                  {contries.map((contry) => (
                    <option className='text-gray-950' key={contry.isoCode} value={contry.isoCode}>
                      {contry.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <span className="text-white">Select State</span>
                  <select
                    className="w-full mt-2 p-2 bg-transparent border-b-2 focus:outline-none focus:border-blue-500 text-white"
                    disabled={!selectedContry}
                    onChange={(e) => handleStatehange(states.find((s) => s.isoCode === e.target.value))}
                  >
                    {states.map((state) => (
                      <option className='text-slate-900'  key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="text-white">Select District</span>
                  <select
                    className="w-full mt-2 p-2 bg-transparent border-b-2 focus:outline-none focus:border-blue-500 text-white"
                    disabled={!selectedContry}
                    onChange={(e) => handleCityhange(e)}
                  >
                    {cities.map((city) => (
                      <option className='text-slate-900' key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="relative">
                <label
                  title="Click to upload"
                  htmlFor="button2"
                  className="cursor-pointer flex items-center gap-2 px-4 py-3 relative before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <div className="flex items-center gap-2 relative z-10">
                    <img
                      className="w-6"
                      src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                      alt="file upload icon"
                      width="512"
                      height="512"
                    />
                    <div>
                      <span className="mb-0 block text-base font-semibold text-blue-900 group-hover:text-blue-500">Upload a file</span>
                      <span className="mt-0.5 block text-sm text-gray-500">Max 2 MB</span>
                    </div>
                  </div>
                </label>
                <input hidden type="file" name="button2" id="button2" />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-2 bg-slate-300 text-black px-6 py-3 rounded-3xl hover:bg-slate-700 transition duration-300"
                >
                  Register Details
                </button>
              </div>
              <p className="text-white text-center">
                Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;




























// import React, { useEffect, useRef } from 'react'
// import { useState } from 'react';
// import { Country, State, City } from "country-state-city";
// import { useNavigate } from 'react-router-dom';

// import { register } from '../services/authService';



// function Register() {
//   const navigate=useNavigate()

//   const [contries,setContries]=useState(Country.getAllCountries())
//   const [states,setStates] =useState([])
//   const [cities,setCities]=useState([])
  
//   const [selectedContry,setSelectedContry] =useState(null)
//   const [selectedState,setSelectedState] =useState(null)
//   const [selectedCity,setSelectedCity]=useState(null)
//   const [errors,setErros]=useState({})
//   //  console.log(contries);
   
//    const imageRef=useRef(null)
//   const [profilePic,setProfilePic]=useState(null)

//     const [formData, setFormData] = useState({
        
//         email: "",
//         password: "",
//         confirmPassword:"",
//         companyName:"",
//         nameOfManager:"",
//         contactNO:"",
//         registrationId:"",
        
//       });
//       const handleChange = (e) => {
//        const {name, value}= e.target.value
//         setFormData({...formData,[e.target.name]: e.target.value})
//         // if(name===email&& !formData.email.length<0){
//         //   setErros((prevErrors)=>({
//         //     ...prevErrors,
//         //     email:""
//         //   }))
//         // }
        
//       };
      

//       const  handleContryChange =(country)=>{
//         setSelectedContry(country)
      
//         setStates(State.getStatesOfCountry(country.isoCode))
//        setCities([])
//       }
//       // console.log(states);

//       const handleStatehange = (state)=>{
//         setSelectedState(state)
        
//         if(selectedContry){
//         setCities(City.getCitiesOfState(selectedContry.isoCode, state.isoCode))
//         }

//       }
//       const handleCityhange= (city)=>{

//         setSelectedCity(city.target.value)
       
        
//       }
    
     

//       const handleClick= (e)=>{
//         imageRef.current.click()
//       }
    
//       const handleImageChange =(e)=>{
//         const file= e.target.files[0]
//         if(file){
//           const imageUrl = URL.createObjectURL(file);
//           setProfilePic(imageUrl)

//         }
//       }
      
//       console.log(selectedContry);
      
//       console.log(selectedState)
//       console.log(selectedCity);
//       console.log(formData);
      

//       const validate = () => {
//         let newErrors = {};
    
        
        

//         if(!formData.companyName){
//           newErrors.companyName="*Company Name is required"
//         }
//         if(!formData.email){
//           newErrors.email ="*Email is required"
//         }else if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
//           newErrors.email="Enter the valid Email"

//         }
    
       
//         if (!formData.password ) {
//             newErrors.password = "Password is required";
//         }else if(formData.password.length<8) {
//           newErrors.password = "Password is must be  atleast 8 characters";
//         }
    
       
//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = "Passwords do not match";
//         }
    
        
//         if (!formData.contactNO) {
//             newErrors.contactNO = "Contact Number is required";
//         } else if(formData.contactNO && !/^\d{10}$/.test(formData.contactNO)){
//           newErrors.contactNO = "Enter valid Contact Number";
//         }
//         if(!formData.registrationId){
//           newErrors.registrationId="Registration Id is Required"
//         }
//         if(!formData.nameOfManager){
//           newErrors.nameOfManager= "Manager Name is Required"
//         }
        
//         if (!selectedContry) {
//             newErrors.country = "*Required field";
//         }
//         if (!selectedState) {
//             newErrors.state = "*Required field";
//         }
//         if (!selectedCity) {
//             newErrors.city = "*Required field";
//         }
    
//         setErros(newErrors);
//         return Object.keys(newErrors).length === 0; 
//       }
      
//       //   const countryname= selectedContry?.name || "Unknown";
//       //    console.log(countryname);
//       //  const stateName=selectedState?.name||"Unknown"
//       //  console.log(stateName);
//       //  console.log(selectedCity);

       
       

//       const handleFormSubmit = async (e)=>{
//         e.preventDefault()
//        if(!validate ()){
//         // console.log("validation failed")
//         return
//        }
//        setFormData(prev=>({
//         ...prev,
//         countryname:selectedContry?.name || "Unknown",
//         stateName:selectedState?.name||"Unknown",
//        cityName:selectedCity

//        }))
//        console.log(formData)

//        try{
//         const response= await register(formData)
//         if(response){
//           console.log("Registration succesfull")
//          navigate("/pending")
//         }
//        }catch(error){
//        console.error("Registration fail")
//        }
//       }
//       useEffect(()=>{
//         console.log(errors,"errors are")
//       },[errors])


//   return (
//     <div className="bg-white min-h-screen flex items-center justify-center h-screen">
//        <div className="bg-white flex rounded-4xl shadow-xl w-3/4 p-5 items-center h-screen ">
//   <div className="w-1/2 px-8 md:px-16 bg-white h-full flex">
//     <form className="overflow-hidden p-6 space-y-10  w-full  ">
        
//       <h2 className="text-2xl font-bold text-center">REGISTRATION</h2>

      
// <div 
//   className="flex flex-col items-center justify-center h-24  -mt-5 space-y-2">
//     <span className="inline-block w-[62px] h-[62px] bg-gray-100 rounded-full overflow-hidden" onClick={handleClick}>
//        {profilePic ? <img src={profilePic}
             
//              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
//              alt="" /> : <img
//              src="user-profile-svgrepo-com.svg"
//              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//              alt="Profile"
//            />}
//     </span>
//     <p>Add Profile</p>
//     <input type="file" 
//     ref={imageRef}
//     onChange={handleImageChange}
//     className='  hidden className="bg-blue-500 text-white text-sm px-2 py-1 rounded cursor-pointer"'/>
//   </div>

//       <div className="relative border-b-2 focus-within:border-blue-500">
//   <input
//     type="companyName"
//     name="companyName"
//     id="companyName"
//     value={formData.companyName}
//     onChange={handleChange}
//     className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
//     placeholder=" " 
//   />
//   <label
//     htmlFor="companyName"
//     className=" absolute left-2  transition-all duration-300
//       peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//       peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
//       // {$errors.companyName ? 'text-gray-500' :'text-red-600'}
//       ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
//   >
//    {errors.companyName && !formData.companyName? <p className='text-red-600'>{errors.companyName}</p>: " Company Name" }
   
   
//   </label>
// </div>


      
//       <div className="relative border-b-2 focus-within:border-blue-500">
//   <input
//     type="text"
//     name="email"
//     id="email"
//     value={formData.email}
//     onChange={handleChange}
//     className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
//     placeholder=" " 
//   />
//   <label
//     htmlFor="password"
//     className=" absolute left-2 text-gray-500 transition-all duration-300
//       peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//       peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
//       ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
//   >
//    {errors.email ? <p className='text-red-600'>{errors.email}</p>: "Email" }
//   </label>
// </div>


      
//       <div className="relative border-b-2 focus-within:border-blue-500">
//   <input
//     type="password"
//     name="password"
//     id="password"
//     value={formData.password}
//     onChange={handleChange}
//     className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
//     placeholder=" " 
//   />
//   <label
//     htmlFor="password"
//     className=" absolute left-2 text-gray-500 transition-all duration-300
//       peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//       peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
//       ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
//   >
//     {errors.password ? <p className='text-red-600'>{errors.password}</p>: "Password" }
//   </label>
// </div>
   
// <div className="relative border-b-2 focus-within:border-blue-500">
//   <input
//     type="confirmPassword"
//     name="confirmPassword"
//     id="confirmPassword"
//     value={formData.confirmPassword}
//     onChange={handleChange}
//     className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
//     placeholder=" " 
//   />
//   <label
//     htmlFor="confirmPassword"
//     className=" mb-4 absolute left-2 text-gray-500 transition-all duration-300
//       peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//       peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
//       ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
//   >
//  {errors.confirmPassword ? <p className='text-red-600'>{errors.confirmPassword}</p>: " Confirm Password" }
//   </label>
// </div>

// <div className="relative border-b-2 focus-within:border-blue-500">
//   <input
//     type="nameOfManager"
//     name="nameOfManager"
//     id="nameOfManager"
//     value={formData.nameOfManager}
//     onChange={handleChange}
//     className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer"
//     placeholder=" " 
//   />
//   <label
//     htmlFor="nameOfManager"
//     className=" absolute left-2 text-gray-500 transition-all duration-300
//       peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//       peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500
//       ${formData.password ? '-top-4 text-sm text-white' : ''}"
//   >
//     {errors.nameOfManager && !formData.nameOfManager? <p className='text-red-600'>{errors.nameOfManager}</p>:"Name of Manger"}
//   </label>
// </div>

//     </form>
    
//         </div>

//         <div className="md:w-1/2 px-8 md:px-16 bg-blue-950 h-full flex  round">

//         <form className="overflow-hidden p-6 space-y-10  w-full  rounded-tl-lg rounded-bl-lg"
//         onSubmit={handleFormSubmit}
//         >
//       <h2 className="text-2xl font-bold text-center text-white">COMPANY DETAILES</h2>
  
//       <div className="relative border-b-2 focus-within:border-blue-500">
//   <input
//     type="contactNO"
//     name="contactNO"
//     id="contactNO"
//     value={formData.contactNO}
//     onChange={handleChange}
//     className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer text-white"
//     placeholder=" " 
//   />
//   <label
//     htmlFor="contactNO"
//     className=" absolute left-2 text-gray-500 transition-all duration-300
//       peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//       peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white
//       ${formData.password ? '-top-4 text-sm text-white : ''}"
//   >
//    {errors.contactNO ? <p className='text-red-600'>{errors.contactNO}</p>: "Contact Number" }
//   </label>
// </div>
   
// <div className="relative border-b-2 focus-within:border-blue-500">
//   <input
//     type="registrationId"
//     name="registrationId"
//     id="registrationId"
//     value={formData.registrationId}
//     onChange={handleChange}
//     className=" mt-2 w-full appearance-none focus:outline-none bg-transparent p-2 peer text-white"
//     placeholder=" " 
//   />
//   <label
//     htmlFor="registrationId"
//     className=" absolute left-2 text-gray-500 transition-all duration-300
//       peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//       peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white 
//       ${formData.password ? '-top-4 text-sm text-white' : ''}"
//   >
//  {errors.registrationId && !formData.registrationId ? <p className='text-red-600'>{errors.registrationId}</p>: "Registration Id" }
//   </label>
   
  

// </div>
 
// <div className=" mt-2 relative border-b-2 focus-within:border-blue-500 ">
//   <span className= ' text-white '>Select Country</span>
//   <select 
//   className='w-full flex mt-2'
//   onChange={(e=>{
//     handleContryChange( 
//       contries.find((c)=> c.isoCode === e.target.value)
//     )
//   })}
//   name="" id="">
//     {contries.map((cont)=>(
      
//       <option
//       key={cont.isoCode} 
//       value={cont.isoCode}
//        >{cont.name}</option>
//     ))}
//   </select>

//     </div>

 
//     <div className=" focus-within:border-blue-500 flex  ">
    
//     <div className="w-1/2  rounded">
//     <span className='text-white'>Select State</span>
    
//   <select 
//   className=' w-full  flex mt-2'
//   disabled={!selectedContry}
//   onChange={(e=>{
//     handleStatehange( 
//       states.find((s)=> s.isoCode === e.target.value)
//     )
//   })}
//   name="" id="">
//     {states.map((state)=>(
      
//       <option
//       key={state.isoCode} 
//       value={state.isoCode}
//        >{state.name}</option>
//     ))}
//   </select>
//   </div>
//   <div className="w-1/2   rounded ">
//   <span className='text-white'>Select District</span>
//   <select 
//   className='w-full flex ml-1 mt-2'
//   disabled={!selectedContry}
//   onChange={(e)=>handleCityhange(e)}
    
  
//   name="" id="">
//     {cities.map((city)=>(
      
//       <option
       
      
//        >{city.name}</option>
//     ))}
//   </select>
//   </div>
//     </div>

    

// <div className="relative ">
//   <label
//     title="Click to upload"
//     htmlFor="button2"
//     className=" cursor-pointer flex items-center gap-2 px-4 py-3 relative before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
//   >
//     <div className="flex items-center gap-2 relative z-10">
//       <img
//         className="w-6"
//         src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
//         alt="file upload icon"
//         width="512"
//         height="512"
//       />
//       <div>
//         <span className="mb-0 block text-base font-semibold text-blue-900 group-hover:text-blue-500">
//           Upload a file
//         </span>
//         <span className="mt-0.5 block text-sm text-gray-500">Max 2 MB</span>
//       </div>
//     </div>
//   </label>
//   <input hidden type="file" name="button2" id="button2" />
// </div>


     
//     <div className="">
//         <button
          
//           className= " mt-2 bg-slate-300  text-black black px-6 py-3 rounded-3xl hover:bg-slate-700 transition duration-300 "
//         >
          
//            Register Detailes
//         </button>
//       </div>
//       <p className='text-white '>Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a></p>

//     </form>
    
//         </div>

//         </div>
        
//     </div>
//   )
// }

// export default Register