import React, { useRef } from 'react'
import { useState } from 'react';
function Register() {
   const imageRef=useRef(null)
  const [profilePic,setProfilePic]=useState(null)

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

      const handleClick= (e)=>{
        imageRef.current.click()
      }
    
      const handleImageChange =(e)=>{
        const file= e.target.files[0]
        if(file){
          const imageUrl = URL.createObjectURL(file);
          setProfilePic(imageUrl)
        }
      }
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center h-screen">
       <div className="bg-white flex rounded-2xl shadow-lg w-3/4 p-5 items-center h-full ">
  <div className="w-1/2 px-8 md:px-16 bg-white h-full flex">
    <form className="overflow-hidden p-6 space-y-10  w-full  ">
        
      <h2 className="text-2xl font-bold text-center">Login</h2>

      {/* <div className='flex justify-center my-4 '
      onClick={handleClick}>
        {profilePic? <img src={profilePic}
        className='hidden className="bg-blue-500 text-white text-sm px-2 py-1 rounded cursor-pointer'/>: 
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEX///8AAAAEBAQ5OTn8/Pz5+fn19fUICAjv7+9oaGgXFxeampo9PT0mJibNzc3o6OhRUVHU1NSSkpLBwcFKSkrf39+mpqasrKy1tbU0NDRERER7e3tfX190dHSEhIRWVlYeHh6b0ZfdAAAEFklEQVR4nO2aiZaiMBBFE7pIQHYQRMft/79yKgmg3QqoDcmcM3VtN0R4XUkqr4KMEQRBEARBEARBEARBEARBuADMHe7ed5ucgef24YcE9d53K0urgiyNwny/z8MozUBrcggKEAyKKN/wjk0eFcAEuIsUMIxJFsWce3jj3VMcZRg/Z6pQFKQXpUX9Sdm/OqbgQhT0T9WemxB1mBf76raHbVk+qw78KYdKtaztaKmBD6w4cM97lITbDoX63DJ64Pshnl8+ipKoKvTZzwxmQZRgrOVPA2W2tgx3sS3KZ1mOZx8R5fE8s50X1OTC2s0zQUMabU2/swmw4M+UJs7/BNZHH7A6nhYV1w5SQjHZejgGC2Z3CtRdaloT5ztmNyeoEERzoiKLgrQojEA5J6p0MPW9IMr+TLOb71N2RamTVXOiKpuKOlHF17Smr8K6KMzox2lRR9sZ3VfTH+YEOean0NBEqqqxW9iAbj+PP3cJeItrAN9ySkCLh0lBPvUunrJ+Jdopu6LAGKr4uaFSG+NMVzQ2mw+M162SsV6eqHxgu1RWqgBgdP6LAJjlQHUIJkrO++L4/qEUysO7AUPRdNWoLmpkV4s27qp2XRiIast1vjJBUtq2lXDTchqz6uM3+Z0H3eSNb9aHHInSwlBXUJXHONlskvhYVgEqcrpiBkYUDsOgLtK0qAN8aUS5Xcljj8uL/wgAtzsxDnYk8H1zp1hNAiIr1OgrMuE2G/idgcnS5rRNuqUzmWxPTZr5xkZY9njMR5OH5wyq8+VhSWFzOWMKBb2LVU06UkG0vRpTd3s0k+B1GwU6UlZV4Siry6txmZ6ekQdF3ZZrWVseiugOdrFxLNL4lt5KKfcijYeJd5YXPdNQ6prFu7d3XRN6vPtIhqklOSo/BruEj60M9+hPk11gJZ8qq3K+zigadF3PgZXM4Geh6dgzsrr+H2brj0AcdSEfutKsLPwL6/XbD+PkmXpTTvcpaSpVD2O1ohz9/4qQfx9w0+2nH0IxfH1xlM0NyuEy6GvonbEMhHXKZT1ntIkaU++J8njSrnYBFxuh2HP5Uh//1oiS7wu2UsmMc8tJn+Y9UXrv00ozDmrS163ektTFim/alVSJLL87zRuKFHm20opHI98PUy9NNitF6vBB2w3xOqwTqfZjTfqL7RqaIBwM5vuomXkNUZijfhWp/dJXINQ833wqqKdZeK0BJy6VOD8OlP7qKVi45gJWfz72Og71kpHSR0r5q95uNFTpcLClZO36Q38qSV/pXnItFI90/jREN86Li7r8TpAK1XHRcksd6aDr8d/At7DoBUAQYvTa0OtcxZIlIB5KzPyI5BU8sWj6xEo933/9lm22qHtZyHYsu161UIHk9ve7BEEQBEEQBEEQBEEQBEH8B/wFPeIlBYcTZswAAAAASUVORK5CYII=" alt="Profile icon" className='w-20 h-20 rounded-full border' />}
           <input type="file"
           onChange={handleImageChange}
           className='  hidden className="bg-blue-500 text-white text-sm px-2 py-1 rounded cursor-pointer"'
           ref={imageRef} />
      
         </div> */}

<div 
  className="flex flex-col items-center justify-center h-24  -mt-5 space-y-2">
    <span className="inline-block w-[62px] h-[62px] bg-gray-100 rounded-full overflow-hidden" onClick={handleClick}>
       {profilePic ? <img src={profilePic}
             
             className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
             alt="" /> : <img
             src="Design Studio.jpg"
             className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
             alt="Profile"
           />}
    </span>
    <p>Add Profile</p>
    <input type="file" 
    ref={imageRef}
    onChange={handleImageChange}
    className='  hidden className="bg-blue-500 text-white text-sm px-2 py-1 rounded cursor-pointer"'/>
  </div>

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
    htmlFor="username"
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
    className=" mb-4 absolute left-2 text-gray-500 transition-all duration-300
      peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
      peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 
      ${formData.password ? '-top-4 text-sm text-blue-500' : ''}"
  >
  Confirm Password
  </label>
</div>

    </form>
    
        </div>

        <div className="md:w-1/2 px-8 md:px-16 bg-blue-950 h-full flex">

        <form className="overflow-hidden p-6 space-y-10  w-full">
      <h2 className="text-2xl font-bold text-center text-white">Company Detailes</h2>

      {/* <div className='flex justify-center my-4'>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEX///8AAAAEBAQ5OTn8/Pz5+fn19fUICAjv7+9oaGgXFxeampo9PT0mJibNzc3o6OhRUVHU1NSSkpLBwcFKSkrf39+mpqasrKy1tbU0NDRERER7e3tfX190dHSEhIRWVlYeHh6b0ZfdAAAEFklEQVR4nO2aiZaiMBBFE7pIQHYQRMft/79yKgmg3QqoDcmcM3VtN0R4XUkqr4KMEQRBEARBEARBEARBEARBuADMHe7ed5ucgef24YcE9d53K0urgiyNwny/z8MozUBrcggKEAyKKN/wjk0eFcAEuIsUMIxJFsWce3jj3VMcZRg/Z6pQFKQXpUX9Sdm/OqbgQhT0T9WemxB1mBf76raHbVk+qw78KYdKtaztaKmBD6w4cM97lITbDoX63DJ64Pshnl8+ipKoKvTZzwxmQZRgrOVPA2W2tgx3sS3KZ1mOZx8R5fE8s50X1OTC2s0zQUMabU2/swmw4M+UJs7/BNZHH7A6nhYV1w5SQjHZejgGC2Z3CtRdaloT5ztmNyeoEERzoiKLgrQojEA5J6p0MPW9IMr+TLOb71N2RamTVXOiKpuKOlHF17Smr8K6KMzox2lRR9sZ3VfTH+YEOean0NBEqqqxW9iAbj+PP3cJeItrAN9ySkCLh0lBPvUunrJ+Jdopu6LAGKr4uaFSG+NMVzQ2mw+M162SsV6eqHxgu1RWqgBgdP6LAJjlQHUIJkrO++L4/qEUysO7AUPRdNWoLmpkV4s27qp2XRiIast1vjJBUtq2lXDTchqz6uM3+Z0H3eSNb9aHHInSwlBXUJXHONlskvhYVgEqcrpiBkYUDsOgLtK0qAN8aUS5Xcljj8uL/wgAtzsxDnYk8H1zp1hNAiIr1OgrMuE2G/idgcnS5rRNuqUzmWxPTZr5xkZY9njMR5OH5wyq8+VhSWFzOWMKBb2LVU06UkG0vRpTd3s0k+B1GwU6UlZV4Siry6txmZ6ekQdF3ZZrWVseiugOdrFxLNL4lt5KKfcijYeJd5YXPdNQ6prFu7d3XRN6vPtIhqklOSo/BruEj60M9+hPk11gJZ8qq3K+zigadF3PgZXM4Geh6dgzsrr+H2brj0AcdSEfutKsLPwL6/XbD+PkmXpTTvcpaSpVD2O1ohz9/4qQfx9w0+2nH0IxfH1xlM0NyuEy6GvonbEMhHXKZT1ntIkaU++J8njSrnYBFxuh2HP5Uh//1oiS7wu2UsmMc8tJn+Y9UXrv00ozDmrS163ektTFim/alVSJLL87zRuKFHm20opHI98PUy9NNitF6vBB2w3xOqwTqfZjTfqL7RqaIBwM5vuomXkNUZijfhWp/dJXINQ833wqqKdZeK0BJy6VOD8OlP7qKVi45gJWfz72Og71kpHSR0r5q95uNFTpcLClZO36Q38qSV/pXnItFI90/jREN86Li7r8TpAK1XHRcksd6aDr8d/At7DoBUAQYvTa0OtcxZIlIB5KzPyI5BU8sWj6xEo933/9lm22qHtZyHYsu161UIHk9ve7BEEQBEEQBEEQBEEQBEH8B/wFPeIlBYcTZswAAAAASUVORK5CYII=" alt="Profile icon" className='w-20 h-20 rounded-full border' />
         </div> */}

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

<div className="relative">
  <label
    title="Click to upload"
    htmlFor="button2"
    className=" cursor-pointer flex items-center gap-2 px-4 py-3 relative before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
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
        <span className="mb-0 block text-base font-semibold text-blue-900 group-hover:text-blue-500">
          Upload a file
        </span>
        <span className="mt-0.5 block text-sm text-gray-500">Max 2 MB</span>
      </div>
    </div>
  </label>
  <input hidden type="file" name="button2" id="button2" />
</div>


     
    <div className="mt-6">
        <button
          onClick={() => window.location.href = '/'} 
          className="bg-slate-300  text-black black px-6 py-3 rounded-3xl hover:bg-slate-700 transition duration-300 "
        >
          
           Register Detailes
        </button>
      </div>
      <p className='text-white '>Already have an account? <a href="/" className="text-blue-500 hover:text-blue-700">Login</a></p>

    </form>
    
        </div>

        </div>
        
    </div>
  )
}

export default Register