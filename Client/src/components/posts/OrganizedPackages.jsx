import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

import { fetchOrganisedPackage } from 'src/services/authService';
import { postSearch } from './packageSearch';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};


function OrganizedPackages() {
  const navigate= useNavigate()
  const [orgPackages,setOrgPackages]=useState([])
  const [selected,setSelected]=useState("")
  const [input,setInput]=useState()
  const [search,setSearch]=useState([])
    useEffect(()=>{
      const fetchData= async ()=>{
        try{ 
           const response = await fetchOrganisedPackage()
          //  console.log(response)
           setOrgPackages(response.response)

        }catch(error){
      console.error(error)
        } 
      }
      fetchData()
    },[])
  console.log(orgPackages)
  
  const handleNavigation =(id)=>{
   
  //  const selectedPackage = orgPackages.find((orgPackages) => orgPackages._id === id);
   const props =orgPackages.find((Packages) => Packages._id === id)
   
  navigate("/posts/oganized/more",{state:props})
   
  }
  
  const handleSearch =(e)=>{
   e.preventDefault()
        if(e.target.value ===""){
         setSearch(null)
         return 
        }
        setInput(e.target.value)
        setSearch(postSearch(input,orgPackages))
  }
 
   return (
    <div className='w-full'>
      <div className="mt-4 flex justify-center items-center space-x-6">
       
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `text-gray-800 transition-colors ${
              isActive ? "" : "hover:text-blue-500 font-medium text-red-400"
            }`
          }
        >
          Packages
        </NavLink>

        <NavLink
          to="/posts/package/organized"
          className={({ isActive }) =>
            `text-gray-800 transition-colors ${
              isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"
            }`
          }
        >
          Organized
        </NavLink>

        <NavLink
          to="/posts/package/guides"
          className={({ isActive }) =>
            `text-gray-800 transition-colors ${
              isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"
            }`
          }
        >
          Guides
        </NavLink>
      </div>

      <div className="mb-5 flex justify-center">
        <hr className="w-1/2" />
      </div>
        {/* <div className="flex justify-center">
        <h1 className="text-gray-600">No  Organized Packages Here...🤷‍♂</h1>
        </div> */}
           <div className="py-10 px-5">
  <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Features Posts</h2>
  <div className="">
  <div class="flex justify-end px-4">
    <form class="mt-10 w-full max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
        <input onChange={handleSearch}
         type="text" placeholder="Search anything" class="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic"/>
        <button 
        onClick={handleSearch}
        class="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full  border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3">
            Search
        </button>
    </form>
</div>
    <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
     
      { search.length>0 ? search: orgPackages.map((post, index) => (
        <div key={index} className="w-full bg-white rounded-lg shadow-md">
         
         {post.images && (
  <Slider {...settings}>
    {post.images.map((image, idx) => (
      <div key={idx}>
        <img src={image} alt={`Post ${idx + 1}`} className="w-full h-40 object-cover" />
      </div>
    ))}
  </Slider>
)}
          <div className="p-4">
            
            <span className={`px-3 py-1 text-sm font-semibold rounded ${post.categoryColor}`}>
              Organized Trip
            </span>
            
            <h3 className="mt-2 text-lg font-semibold">{post.destination
            }</h3>
            
            <p className="text-gray-600 text-sm mt-1">{post.
packageDescription
}</p>
            
           
           <button  onClick={(e)=>handleNavigation(post._id)}
            className="text-purple-600 font-semibold text-sm mt-2 inline-block">Read More →</button>
           
          
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
          

      
      <div className="fixed bottom-5 right-5 ">
        <a 
        href="/posts/package/addOrganizedPackage"
        className="bg-blue-500 text-white text-3xl w-16 h-16 flex items-center justify-center rotate-45 rounded-3xl">
          ×
        </a>
      </div>
    </div>
  );
}

export default OrganizedPackages;