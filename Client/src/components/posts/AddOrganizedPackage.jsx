import React, { useEffect, useState } from 'react'
import { Country, State, City } from "country-state-city";

import PackageImage from './PackageImage';
function AddOrganizedPackage() {
 const [country,setCountry]= useState(Country.getAllCountries())
//    const [state,setState]=useState([])
//    const [city,setCity]=useState([])
   const [fields, setFields] = useState({
     companyDescription: "",
     destination: "",
     startingDestination:"",
     destinationCategory: "",
     adult: 0,  
     minor: 0,  
     phoneCode: "",
     mobileNumber: "",
     currency: "",
     payment: "",
     packageDescription: "",
     startingDate:"",
     returningDate:"",
   });
   
   
   const [selectedCountry,setSelectedCountry]= useState(Country.getAllCountries())
  //  const [selectedState,setSelectedState]=useState([])
  //  const [selectedCity,setselectedCity]=useState([])  
   const [images,setImages]=useState({})
   const [imageArray,setImageArray]=useState([])
   
  const handleChange = (e)=>{
    const {name,value}=e.target
       setFields({...fields, [name]:value})
  }
   const handleContryChange =(country)=>{
     setSelectedCountry(country)
    //  setState(State.getStatesOfCountry(country.isoCode))
   }
  //  const handleStateChange = (state)=>{
  //    setSelectedState(state)
  //    setCity(City.getCitiesOfState(selectedCountry.isoCode,  state.isoCode))
  //  }
  //  const handleCityChange = (city)=>{
  //       setselectedCity(city)
  //  }
   
   useEffect(() => {
     
     if (images && Object.keys(images).length > 0) {
       setImageArray(Object.values(images));
     }
   }, [images]);
   
 //  console.log(imageArray,"image Array is ")
    
  const handleSubmit = async ()=>{
  
   console.log(fields)
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
   }
   
    try{
     const response = await addPackages(formData,updatedFields)
    }catch(error){
       console.error(error, "error occured while recieving")
    }
    
  }
   // console.log(images , "this is from the parent")
    
 
 
   return (
 <>
    <nav className='w-full h-16 bg-slate-500'>
       <hr className='w-1/2'/>
     </nav>
      <div className=' mt-5 w-full h-scheen'>
       <div>
         <h1 className='font-bold text-3xl'> Add  Your Package Detailes</h1>
         <h1 className=' mt-5 font-semibold text-1xl'> Describtion of Package</h1>
         <div className=" space-y-3 w-full">
   <textarea
   placeholder='Describe about your organized package...!'
     type="text" 
     name='packageDescription'
     value={fields.packageDescription}
     className=" w-full h-32  py-2.5 sm:py-3 px-4 block  border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
     onChange={handleChange}
   />
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
 <label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
         Select Country
       </label>
       <select 
   id="destination Catogory"
  className="w-full border border-gray-300 p-2 rounded"
   onChange={(e)=>handleContryChange(country.find((c)=>c.isoCode === e.target.value))}
 >
   {country.map((country)=>(
       <option value={country.isoCode} key={country.isoCode}>{country.name}</option>
   ))}
   </select>
 
 {/* <label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
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
 </select> */}
 
 <div className="flex flex-row items-center gap-4 w-full">
      <div className="flex flex-col w-1/2">

      
       <label htmlFor="adult" className="text-gray-700 font-medium">
         Adult
       </label>
       <input 
         type="text" 
         id="adult"
         name='adult'
     value={fields.adult}
         className="w-full border border-gray-300 p-2 rounded"
         placeholder="Enter adult count"
         onChange={handleChange}
       />
     </div>
 
      <div className="flex flex-col w-1/2">
       <label htmlFor="minor" className="text-gray-700 font-medium">
         Minor
       </label>
       <input 
         type="text" 
         id="minor"
         name='minor'
     value={fields.minor}
         className="w-full border border-gray-300 p-2 rounded"
         placeholder="Enter minor count"
         onChange={handleChange}
       />
       
     </div>
 
   </div>

   <label htmlFor="destination1" className="text-gray-700 font-medium">
         Starting Date
       </label>
       <input 
         type="Date" 
         id="startingDate"
         name='startingDate'
     value={fields.startingDate}
         className="w-full border border-gray-300 p-2 rounded"
         placeholder="Destination here"
         onChange={handleChange}
       />

<label htmlFor="destination1" className="text-gray-700 font-medium">
        Returning Date
       </label>
       <input 
         type="Date" 
         id="returningDate"
         name='returningDate'
     value={fields.returningDate}
         className="w-full border border-gray-300 p-2 rounded"
         placeholder="Destination here"
         onChange={handleChange}
       />
     </div>
      <div className="flex flex-col w-full sm:w-full md:w-1/2">


      <label htmlFor="destination1" className="text-gray-700 font-medium">
         Starting Destination
       </label>
       <input 
         type="text" 
         id="startingDestination"
         name='startingDestination'
     value={fields.startingDestination}
         className="w-full border border-gray-300 p-2 rounded"
         placeholder= " Starting Destination here"
         onChange={handleChange}
       />
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
   <option value="Industires">Industires</option>
   <option value="Beach">Beach</option>
   <option value="Forest">Forest</option>
   <option value="Adventure">Adventure</option>
 </select>
 
 {/* <label htmlFor="destination2" className= " mt-2 text-gray-700 font-medium">
          Select State
       </label>
       <select 
   id=""
   className="w-full border border-gray-300 p-2 rounded"
   disabled={!selectedCountry}
   onChange={(e)=>handleStateChange(state.find((s)=>s.isoCode === e.target.value))}
 >
   {state.map((state)=>(
       <option value={state.isoCode} key={state.isoCode}>{state.name}</option>
   ))}
   
   
 </select> */}
 
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
       type="text" 
       id="phone"
       name='payment'
     value={fields.payment}
       className="flex-1 border border-gray-300 p-2 rounded"
       placeholder="Enter The Amout"
       onChange={handleChange}
     />
   </div>
   
     </div>   
   </form>
   
 
   
  <PackageImage onChange={(file,key)=>setImages((prev)=>({...prev ,[key]:file}))}/>
 <button 
   type="submit"
   className="mt-3 bg-blue-700 backdrop-blur-lg text-white font-medium py-2 px-6 rounded-lg border border-white/30 shadow-md hover:bg-purple-700 transition 
   sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 text-sm sm:text-base lg:text-lg"
   onClick={handleSubmit}
 >
   Submit
 </button>
 </div>
         </div>    
     </div>
     </>
   )
}

export default AddOrganizedPackage

