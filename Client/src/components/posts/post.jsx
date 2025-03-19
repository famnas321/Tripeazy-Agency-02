import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {fetchAddedPackages} from "../../services/authService"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const tabs = [
  { name: "Packages", path: "/posts" },
  { name: "Organized", path:"/posts/package/organized" },
  { name: "Guides", path: "/posts/package/guides"},
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Navigation = () => {
  const [fetchedData,setFetchedData]=useState([])
  useEffect(()=>{
   const fetchPackages = async ()=>{
    try{
      const response = await fetchAddedPackages()
      
       setFetchedData(response.fetchedAgency)
  }catch(error){
      console.log(error)

 }
   }
   fetchPackages(fetchedData)
  },[])
  console.log(fetchedData)
  return (

    <>


     
     <div className="w-full h-screen ">
      
      <div className="mt-4 flex justify-center items-center space-x-6">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `text-gray-800 transition-colors ${
                isActive ? "text-blue-600 font-bold " : "hover:text-blue-500 hover:font-semibold"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>



      <div className="py-10 px-5">
  <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Features Posts</h2>
  <div className="">
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
     
      {fetchedData.map((post, index) => (
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
              {post.destination}
            </span>
            
            <h3 className="mt-2 text-lg font-semibold">{post.destinationCategory}</h3>
            
            <p className="text-gray-600 text-sm mt-1">{post.companyDescription}</p>
            
            <a href="#" className="text-purple-600 font-semibold text-sm mt-2 inline-block">Read More →</a>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      {/* <div className="mb-5 flex justify-center">
        <hr className="w-1/2" />
      </div>
        <div className="flex justify-center">
        <h1 className="text-gray-600">No Packages Here...🤷‍♂</h1>
        </div>
         */}
      
      <div className="fixed bottom-5 right-5 ">
        <a 
        href="/addPackage"
        className="bg-blue-500 text-white text-3xl w-16 h-16 flex items-center justify-center rotate-45 rounded-3xl">
          ×
        </a>
      </div>
      </div>

    </>
  );
};

export default Navigation;