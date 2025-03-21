import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {fetchAddedPackages} from "../../services/authService"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

import { postSearch } from "./packageSearch";

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
  const navigate=useNavigate()
  const [fetchedData,setFetchedData]=useState([])
  const [selectedButton,setSelectedButton]=useState("")
  const [filteredData,setFilteredData]=useState([])
  const[search,setSearch]=useState([])
  const[input,setInput]=useState()
  useEffect(()=>{
   const fetchPackages = async ()=>{
    try{
      const response = await fetchAddedPackages()
      console.log(response)
       setFetchedData(response.fetchedAgency)
       setFilteredData(response.fetchedAgency)
      
  }catch(error){
      console.log(error)

 }
   }
   fetchPackages(fetchedData)
   
  },[])
  console.log(fetchedData)
   const handleNavigation =(id)=>{
    console.log(id)
    const props=fetchedData.find((prop)=>prop._id === id)
    navigate("/posts/organized/more",{state:props})
   }

   const categories = [
    { destinationCategory: "All" },
    { destinationCategory: "Historical Places" },
    { destinationCategory: "Top Cities" },
    { destinationCategory: "Industries" },
    { destinationCategory: "Beach" },
    { destinationCategory: "Forest" },
    { destinationCategory: "Adventure" },
  ];

  const handleTopButton=(catogory)=>{
    setSearch(null)
  console.log(catogory)
  setSelectedButton(catogory)
  if(catogory === "All"){
   setFilteredData(fetchedData)
  }else {
    const filtered = fetchedData.filter(
      (data) => data.destinationCategory === catogory
    );
    setFilteredData(filtered);
  }
  }

  const  handleSearch= (e)=>{
     if(e.target.value ===""){
      setSearch(null)
      return 
     }
     setInput(e.target.value)
     setSearch(postSearch(input,filteredData))
       
       
  }
 
  // console.log(search,"searched")
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
  <div class="grid justify-end">
  <div class="flex justify-end px-4">
    <form class="mt-10 w-full max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
        <input onChange={handleSearch}
         type="text" placeholder="Search anything" class="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" name="topic"/>
        <button 
        onClick={handleSearch}
        class="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3">
            Search
        </button>
    </form>
</div>
</div>
  <div className="flex flex-wrap gap-2 p-4 justify-center">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleTopButton(category.destinationCategory)}
          className={`text-white px-4 py-2 text-sm rounded-full transition duration-300 w-32 h-10 flex items-center justify-center truncate 
            ${
              selectedButton === category.destinationCategory
                ? "bg-blue-950" // Apply this if the button is selected
                : "bg-purple-700 hover:bg-blue-950" // Default and hover styles
            }`}
        >
          {category.destinationCategory}
        </button>
      ))}
    </div>
  
    <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
     
      {(search && search.length >0 ?search :filteredData).map((post, index) => (
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
            <h3 className="mt-2 text-lg font-semibold">{post.agencyId.companyName}</h3>
           
            
            
            <p className="text-gray-600 text-sm mt-1">{post.companyDescription}</p>
            
            <button onClick={(e)=>handleNavigation(post._id)} className="text-purple-600 font-semibold text-sm mt-2 inline-block">Read More →</button>
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