import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { register } from '../services/authService';


function SignUp() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    managerName: "",
    registrationId: "",
    country: "",
    state: "",
    district: ""
  });
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
    console.log(formData)
  }


  // const validateForm = ()=>{
  //   let newErrors = {};

  //   for (let key in formData){
  //     if(!formData[key].trim()){
  //       newErrors[key] = "This field is required";
  //     }
  //   }

  //   if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = "Enter a valid email address";
  //   }

  //   if (formData.password.length < 8){
  //     newErrors.password = "Password must be at least 8 characters Long"
  //   }

  //   if (formData.password !== formData.confirmPassword){
  //     newErrors.confirmPassword = "Password do not match"
  //   }

  //   if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
  //     newErrors.contactNumber = "Enter a valid 10-digit phone number";
  //   }

    
  //   if (formData.registrationId && !/^[a-zA-Z0-9]+$/.test(formData.registrationId)) {
  //     newErrors.registrationId = "Registration ID must be alphanumeric";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0

  // }

  const handleSubmit = async  (e)=>{
    e.preventDefault();
  
    // if (!validateForm()) return;

    try {
        const response = await register(formData);
        console.log("registration successfull",response);
        navigate("/")
    } catch (error) {
        console.error("error in registration",error);
    }
    
  }
  
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden'>

        {/* left side image */}
        <div className='w-1/2 hidden md:block'>
         <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Signup" className='w-full h-full object-cover'/>
        </div>

        {/* right side form */}
        <div className='w-full md:w-1/2 pl-8 pr-8 pb-4 pt-4'>
         <h2 className='text-2xl font-bold text-center'>Get Started Now</h2>
         <div className='flex justify-center my-4'>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEX///8AAAAEBAQ5OTn8/Pz5+fn19fUICAjv7+9oaGgXFxeampo9PT0mJibNzc3o6OhRUVHU1NSSkpLBwcFKSkrf39+mpqasrKy1tbU0NDRERER7e3tfX190dHSEhIRWVlYeHh6b0ZfdAAAEFklEQVR4nO2aiZaiMBBFE7pIQHYQRMft/79yKgmg3QqoDcmcM3VtN0R4XUkqr4KMEQRBEARBEARBEARBEARBuADMHe7ed5ucgef24YcE9d53K0urgiyNwny/z8MozUBrcggKEAyKKN/wjk0eFcAEuIsUMIxJFsWce3jj3VMcZRg/Z6pQFKQXpUX9Sdm/OqbgQhT0T9WemxB1mBf76raHbVk+qw78KYdKtaztaKmBD6w4cM97lITbDoX63DJ64Pshnl8+ipKoKvTZzwxmQZRgrOVPA2W2tgx3sS3KZ1mOZx8R5fE8s50X1OTC2s0zQUMabU2/swmw4M+UJs7/BNZHH7A6nhYV1w5SQjHZejgGC2Z3CtRdaloT5ztmNyeoEERzoiKLgrQojEA5J6p0MPW9IMr+TLOb71N2RamTVXOiKpuKOlHF17Smr8K6KMzox2lRR9sZ3VfTH+YEOean0NBEqqqxW9iAbj+PP3cJeItrAN9ySkCLh0lBPvUunrJ+Jdopu6LAGKr4uaFSG+NMVzQ2mw+M162SsV6eqHxgu1RWqgBgdP6LAJjlQHUIJkrO++L4/qEUysO7AUPRdNWoLmpkV4s27qp2XRiIast1vjJBUtq2lXDTchqz6uM3+Z0H3eSNb9aHHInSwlBXUJXHONlskvhYVgEqcrpiBkYUDsOgLtK0qAN8aUS5Xcljj8uL/wgAtzsxDnYk8H1zp1hNAiIr1OgrMuE2G/idgcnS5rRNuqUzmWxPTZr5xkZY9njMR5OH5wyq8+VhSWFzOWMKBb2LVU06UkG0vRpTd3s0k+B1GwU6UlZV4Siry6txmZ6ekQdF3ZZrWVseiugOdrFxLNL4lt5KKfcijYeJd5YXPdNQ6prFu7d3XRN6vPtIhqklOSo/BruEj60M9+hPk11gJZ8qq3K+zigadF3PgZXM4Geh6dgzsrr+H2brj0AcdSEfutKsLPwL6/XbD+PkmXpTTvcpaSpVD2O1ohz9/4qQfx9w0+2nH0IxfH1xlM0NyuEy6GvonbEMhHXKZT1ntIkaU++J8njSrnYBFxuh2HP5Uh//1oiS7wu2UsmMc8tJn+Y9UXrv00ozDmrS163ektTFim/alVSJLL87zRuKFHm20opHI98PUy9NNitF6vBB2w3xOqwTqfZjTfqL7RqaIBwM5vuomXkNUZijfhWp/dJXINQ833wqqKdZeK0BJy6VOD8OlP7qKVi45gJWfz72Og71kpHSR0r5q95uNFTpcLClZO36Q38qSV/pXnItFI90/jREN86Li7r8TpAK1XHRcksd6aDr8d/At7DoBUAQYvTa0OtcxZIlIB5KzPyI5BU8sWj6xEo933/9lm22qHtZyHYsu161UIHk9ve7BEEQBEEQBEEQBEEQBEH8B/wFPeIlBYcTZswAAAAASUVORK5CYII=" alt="Profile icon" className='w-20 h-20 rounded-full border' />
         </div>

         {/*form */}
         
         <form className='space-y-4' onSubmit={handleSubmit}>
          <input type="text" name='companyName' placeholder="Company Name" className='w-full p-2 border rounded' onChange={handleChange}/>
          <input type="text" name='email' placeholder='Email Address' className='w-full p-2 border rounded' onChange={handleChange}/>
          <input type="Password" name='password' placeholder='Password' className='w-full p-2 border rounded' onChange={handleChange}/>
          <input type="Password" name='confirmPassword' placeholder='Confirm Password' className='w-full p-2 border rounded' onChange={handleChange}/>
          <input type="text" name='contactNumber' placeholder='Contact Number' className='w-full p-2 border rounded' onChange={handleChange}/>
          <input type="text" name='managerName' placeholder='Name of Manager' className='w-full p-2 border rounded' onChange={handleChange}/>
          <input type="text" name='registrationId' placeholder='Registration Id' className='w-full p-2 border rounded' onChange={handleChange}/>

          <div className='flex space-x-2'>
            <input type="text" name='country' placeholder='Country' className='w-1/3 p-2 border rounded' onChange={handleChange}/>
            <input type="text" name='state' placeholder='State' className='w-1/3 p-2 border rounded' onChange={handleChange}/>
            <input type="text" name='district' placeholder='District' className='w-1/3 p-2 border rounded' onChange={handleChange}/>
          </div>
          <button className='w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-700 transition'>Signup</button>
         </form>

         <p className='text-center text-sm mt-2'>Already have an account ? <button className='text-blue-600 underline' onClick={()=>navigate('/')}>Login</button></p>

         
        </div>
 


         
      </div>
     
    </div>
  )
}

export default SignUp
