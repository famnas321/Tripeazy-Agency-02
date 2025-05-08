import React, { useEffect, useState } from 'react'
import { Country, State, City } from "country-state-city";
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import toast from 'react-hot-toast';

import SuccessModal from '../ApprovalPopUP';
import ProcessingModal from 'src/Additional/ProcessingModal';
import PackageImage from './PackageImage';
import { addPackages } from 'src/services/authService';
import AccessPopup from '../AccessPopup';
import NoAccessPage from 'src/Additional/NoAccessPage';
import { useSelector } from 'react-redux';

function Addpackage() {
  const authData = useSelector((state) => state.auth.userInfo);
  const hasAccess= authData?.status=="Accepted"? true:false
   const navigate= useNavigate()
  const [showPopUp,setShowPopUP]=useState(false)
  const [isProcessing,setIsProcessing]=useState(false)
  const [country,setCountry]= useState(Country.getAllCountries())
  const [state,setState]=useState([])
  const [city,setCity]=useState([])
  const [errors,setErrors]=useState({})
  const [fields, setFields] = useState({
    companyDescription: "",
    destination: "",
    destinationCategory: "",
    adult: 0,  
    minor: 0,  
    phoneCode: "",
    mobileNumber: "",
    currency: "",
    payment: "",
    packageDescription: ""
  });
  
  const [selectedCountry,setSelectedCountry]= useState(Country.getAllCountries())
  const [selectedState,setSelectedState]=useState([])
  const [selectedCity,setselectedCity]=useState([])  
  const [images,setImages]=useState({})
  const [imageArray,setImageArray]=useState([])
  // useEffect(()=>{
  //   if(!hasAccess){
  //     navigate("/noAccess")
  //     return
  //   }
  // },[])
  
  const validate = () => {
    
    const requiredFields = ["companyDescription", "destination", "destinationCategory", "mobileNumber", "payment","packageDescription"];
    const newErrors = {};
  
    for (let field of requiredFields) {
      if (!fields[field]) {
        newErrors[field] = "*required filed";
       
      }
     
    }
     
    if (imageArray.length === 0) {
      newErrors.images = "At least one image must be uploaded.";
    }
    
    setErrors(newErrors); 
    if(Object.keys(newErrors).length >0){
      console.log(newErrors)
      toast.error("You have missed some fields")
    }
  
    return Object.keys(newErrors).length === 0;
  };
  
  
 const handleChange = (e)=>{
   const {name,value}=e.target
      setFields({...fields, [name]:value})
 }
  const handleContryChange =(country)=>{
    setSelectedCountry(country)
    setState(State.getStatesOfCountry(country.isoCode))
  }
  const handleStateChange = (state)=>{
   
    setSelectedState(state)
    setCity(City.getCitiesOfState(selectedCountry.isoCode,  state.isoCode))
  }
  const handleCityChange = (city)=>{
       setselectedCity(city)
  }

  // const resetForm = () => {
   
  //   setFields({
  //     companyDescription: "",
  //     destination: "",
  //     destinationCategory: "",
  //     adult: 0,
  //     minor: 0,
  //     phoneCode: "",
  //     mobileNumber: "",
  //     currency: "",
  //     payment: "",
  //     packageDescription: ""
  //   });
    
   
  //   setSelectedCountry(null);
  //   setSelectedState(null);
  //   setselectedCity(null);
    
   
  //   setImages({});
  //   setImageArray([]);
    
   
  //   setErrors({});
  // };
  
  
  useEffect(() => {
   

    if (images && Object.keys(images).length > 0) {
      setImageArray(Object.values(images));
    }
  }, [images]);
  
//  console.log(imageArray,"image Array is ")
   
 const handleSubmit = async ()=>{
  
  if (!validate()) return;

 
  if (imageArray.length === 0) {
    console.error("No images selected.");
    
  }
 
  const formData = new FormData()
  console.log("FormData before appending:");
  imageArray.forEach((file) => {
    formData.append("image",file)
   });
  formData.append("type","package")
  
  
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1],"this is form data");
  }


  console.log("submitted")
  const updatedFields = {
    ...fields,
    country:selectedCountry?.name || "Unknown",
    state: selectedState ?.name || "Unknown",
    city: city ?.name || "Unknown",

    
  }
  setIsProcessing(true)
   try{
    const response = await addPackages(formData,updatedFields)
    if(response){
     
     setIsProcessing(false)
      setShowPopUP(true) 

   
    }
   }catch(error){
      console.error(error, "error occured while recieving")
      setIsProcessing(false)
   }
   
 }
  // console.log(images , "this is from the parent")
   

  const checkSelected = ()=>{
   if(!selectedCountry){
   alert("yu")
   return
   }
  }
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

  {/* Right Side - Spacer */}
  <div className="w-[100px] sm:w-[144px]"></div>
</nav>

  
     <div className=' mt-5 w-full h-scheen'>
      <div>
        <h1 className='font-bold text-3xl'> Add  Your Package Detailes</h1>
        <h1 className=' mt-5 font-semibold text-1xl'> Description</h1>
        <div className=" space-y-3 w-full">
  <textarea
  placeholder='why the users should choose you.....'
    type="text" 
    name='companyDescription'
    value={fields.companyDescription || ""} 
    className=" w-full h-32  py-2.5 sm:py-3 px-4 block  border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
    onChange={handleChange}
  />
  {errors.companyDescription && <p className="text-red-500">{errors.companyDescription}</p>}
</div>
<div className="flex flex-col items-start p-4">
  <form action="submit" 
 className="w-full flex flex-wrap md:flex-nowrap items-start gap-4">
  
    <div className="flex flex-col w-full sm:w-full md:w-1/2">
      <label htmlFor="destination1" className="text-gray-700 font-medium">
        Destination
      </label>
      <input 
        type="text" 
        id="destination"
        name='destination'
    value={fields.destination}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Destination here"
        onChange={handleChange}
      />
      {errors.companyDescription && <p className="text-red-500">{errors.destination}</p>}
<label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
        Select Country
      </label>
      <select 
  id="destination Catogory"
 className="w-full border border-gray-300 p-2 rounded"
  onChange={(e)=>handleContryChange(country.find((c)=>c.isoCode === e.target.value))}
>
<option value="" disabled selected >Choose a Country</option>
  {country.map((country)=>(
      <option value={country.isoCode} key={country.isoCode}>{country.name}</option>
  ))}
  </select>

<label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
        Select City
      </label>
      <select 
  id=" city"
  className="w-full border border-gray-300 p-2 rounded"
  onChange={(e)=>handleCityChange(city.find((c)=>c.isoCode === e.target.value))}
>
  {city.map((city)=>(
      <option value={city.isoCode} key={city.isoCode}>{city.name}</option>
  ))} 
</select>

<div className="flex flex-row items-center gap-4 w-full">
     <div className="flex flex-col w-1/2">
      <label htmlFor="adult" className="text-gray-700 font-medium">
        Adult
      </label>
      <input 
       type="number" 
        min="0"
        id="adult"
        name='adult'
    value={fields.adult}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Enter adult count"
        onChange={handleChange}
      />
      {errors.adult && <p className="text-red-500">{errors.adult}</p>}
    </div>

     <div className="flex flex-col w-1/2">
      <label htmlFor="minor" className="text-gray-700 font-medium">
        Minor
      </label>
      <input 
        type="number" 
        min="0"
        id="minor"
        name='minor'
    value={fields.minor}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Enter minor count"
        onChange={handleChange}
      />
    </div>

  </div>
    </div>
     <div className="flex flex-col w-full sm:w-full md:w-1/2">
      <label htmlFor="destination2" className="text-gray-700 font-medium">
        Destination Catogory
      </label>
      <select 
  id="destination Catogory"
  className="w-full border border-gray-300 p-2 rounded"
  name='destinationCategory'
    value={fields.destinationCategory}
    onChange={handleChange}
>
  <option value="" disabled selected >Choose a destination</option>
  <option value="Historical Places">Historical Places</option>
  <option value="Top Cities">Top Cities</option>
  <option value="Industries">Industires</option>
  <option value="Beach">Beach</option>
  <option value="Forest">Forest</option>
  <option value="Adventure">Adventure</option>
</select>
{errors.destinationCategory && <p className="text-red-500">{errors.destinationCategory}</p>}

<label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
         Select State
      </label>
      <select 
      onClick={checkSelected}
  id=""
  className="w-full border border-gray-300 p-2 rounded"
  disabled={!selectedCountry}
  onChange={(e)=>handleStateChange(state.find((s)=>s.isoCode === e.target.value))}
>
 
  {state.map((state)=>(
      <option value={state.isoCode} key={state.isoCode}>{state.name}</option>
  ))}
  
  
</select>
{!selectedCountry && <p>jhjh</p>}
<label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
        Contact Number
      </label>
      <div className="flex flex-row items-center gap-2 w-full">
    <select 
      id="countryCode"
      disabled={!selectedCountry}
      name='phoneCode'
    value={fields.phoneCode}
      className="w-1/6 min-w-[80px] border border-gray-300 p-2 rounded bg-white"
      onChange={handleChange}
    >
      {country.map((c) => (
        <option value={c.isoCode} key={c.isoCode}>{c.phonecode}</option>
      ))} 
    </select>

    <input 
      type="text" 
      id="phone"
      name='mobileNumber'
    value={fields.mobileNumber}
      className="flex-1 border border-gray-300 p-2 rounded"
      placeholder="Enter phone number"
      onChange={handleChange}
    />
     {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
  </div>

  <label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
        Amount 
      </label>
      <div className="flex flex-row items-center gap-2 w-full">
    <select 
      id="countryCode"

      name='currency'
    value={fields.currency}
      disabled={!selectedCountry}
      className="w-1/6 min-w-[80px] border border-gray-300 p-2 rounded bg-white"
      onChange={handleChange}
    >
      
      {country.map((c) => (
        <option value={c.isoCode} key={c.isoCode}>{c.currency}</option>
      ))} 
    </select>
      <input 
      type="number" 
      min="0"
      id="phone"
      name='payment'
    value={fields.payment}
      className="flex-1 border border-gray-300 p-2 rounded"
      placeholder="Enter phone number"
      onChange={handleChange}
    />
     {errors.payment && <p className="text-red-500">{errors.payment}</p>}
  </div>
  
    </div>   
  </form>
  <label htmlFor="" className= " mt-2 text-gray-700 font-medium">
       Package Over view
      </label>

  <textarea
  placeholder='About the package...'
    type="text" 
    name='packageDescription'
    value={fields.packageDescription}
    className=" w-full h-32  py-2.5 sm:py-3 px-4 block  border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
    onChange={handleChange}
  />
   {errors.packageDescription&& <p className="text-red-500">{errors.packageDescription}</p>}
 <PackageImage onChange={(file,key)=>setImages((prev)=>({...prev ,[key]:file}))}/>
 {errors.images && <p className="text-red-500">{errors.images}</p>}
<button 
  type="submit"
  className="mt-3 bg-blue-700 backdrop-blur-lg text-white font-medium py-2 px-6 rounded-lg border border-white/30 shadow-md hover:bg-purple-700 transition 
  sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 text-sm sm:text-base lg:text-lg"
  onClick={handleSubmit}
>
  Submit
</button>
</div>
{isProcessing && <ProcessingModal/>}
 {showPopUp && (
        <SuccessModal onClose={() => setShowPopUP(false)} />
      )}
        </div>    
    </div>
    </>
  )
}

export default Addpackage



