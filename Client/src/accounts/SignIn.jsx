import React from 'react'
import { useState } from 'react';
import { useNavigate, NavLink  } from 'react-router-dom'
import {Toaster,toast} from "react-hot-toast"
import {login} from "../services/authService"

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error,setError]=useState("")
  const navigate = useNavigate();
  const validate=()=>{
   let newError={}
   if(!email){
    newError.email="Email is required"
   }
   else if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    newError.email="Enter the valid Email"
   }
   if(!password){
    newError.password="Password is required"
   }
   else if(password.length < 8){
    newError.password="Password must be atleast 8 characteres"
   }
   setError(newError)
    return Object.keys(newError).length === 0
  }
 
  const handleSubmit= async(e)=>{

   e.preventDefault()
   if(!validate()){
    return
   }
   setError("")
   console.log(email);
   console.log(password);
   
   try{
   const response = await login(email,password)
   localStorage.setItem("token",response.token)
   console.log("Login Succussfull",response);
   navigate("/home")
   
   }catch(error){
    toast.error(error)
     console.error("Error while Login",error)
   }

  }

  return (
    <>
     <section className="bg-gray-50 min-h-screen flex items-center justify-center">
     <div className="bg-gray-100 flex flex-row-reverse rounded-2xl shadow-lg max-w-3xl p-5 items-center">
       
       
        <div className="md:w-1/2 px-8 md:px-16">
        
          <h2 className="font-bold text-2xl text-[#002D74] text-center" >Login</h2>
          <p className="text-xs mt-4 text-[#002D74] mb-2">
            If you are already a member, easily log in
          </p>
          <form  className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          <input 
          type="text" 
          autoComplete="off"
          placeholder="Enter the Email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='w-full p-2 border rounded ' />
         
         {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
            <div className="relative">
            
      <input
        type={showPassword ? "text" : "password"} 
       
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="gray"
        className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        viewBox="0 0 16 16"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          
          <path d="M13.359 11.238a.5.5 0 0 1 .139.69 8.354 8.354 0 0 1-1.198 1.457c-1.482 1.36-3.193 2.115-4.8 2.115-1.605 0-3.317-.754-4.8-2.115A8.354 8.354 0 0 1 .502 11.928a.5.5 0 0 1 .138-.69l1.158-1.158a.5.5 0 1 1 .707.707l-1.158 1.158c1.305 1.206 2.754 1.95 4.155 1.95 1.402 0 2.85-.744 4.156-1.95l1.158-1.158a.5.5 0 0 1 .707-.707l1.158 1.158zM8 5a3 3 0 0 1 3 3 .5.5 0 0 1-1 0 2 2 0 0 0-4 0 .5.5 0 0 1-1 0 3 3 0 0 1 3-3z" />
        ) : (
         
          <>
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </>
        )}
      </svg>
      

    </div>


            <button className=" bg-blue-950 rounded-md text-white py-2 hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </form>
          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            Login with Google
          </button>
          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>

            <NavLink
            to={'/register'}
            >
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              Register
            </button>

            </NavLink>
          </div>
        </div>

        <div class="flex flex-1 ">
  <p class="pe-6"></p>
  <div
    class="h-[450px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-70 dark:via-neutral-400"></div>
  
</div>
        <div className="md:block hidden  bg-gray-900 rounded-2xl w-80">
          <img 
            className="rounded-2xl h-96 w-80"
            src="/login.jpeg"
            alt="Login"
          />
          <p className='text-white mb-10 ml-3 mt-3'>WE MAKE IT <br/>
         EFFORTLESSLY TO TRACK <br/>
          YOUR CLIENTS <br/>
          
          </p>
        </div>
      </div>
    </section>







    {/* <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden'>

      <div className='w-1/2 hidden md:block'>
         <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Signup" className='w-full h-full object-cover'/>
        </div>

        <div className='w-full md:w-1/2 pl-8 pr-8 pb-4 pt-4'>
        <h2>Get started now</h2>
        <input type="text" name='companyName' placeholder="Company Name" className='w-full p-2 border rounded' />
          <input type="text" name='email' placeholder='Email Address' className='w-full p-2 border rounded' />
        </div>
      </div>
      </div> */}
    </>
  )
}

export default SignIn






// <input
// className="p-2 mt-8 rounded-xl border"
// type="email"
// name="email"
// placeholder="Email"
// value={email}
// onChange={(e) => setEmail(e.target.value)}
// required
// />
















