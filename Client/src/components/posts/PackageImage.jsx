import React, { useRef, useState } from 'react';
import { X } from "lucide-react";

function PackageImage({onChange}) {
    const imageOneRef=useRef(null)
    const imageTwoRef=useRef(null)
    const imageThreeRef=useRef(null)
    const imageRef=useRef(null)
    //  const [prop,setProp]=useState({})
    
    const [images,setImages]=useState({
        imageOne:"",
        imageTwo:"",
        imageThree :""
    })
    
     const handleClick = (ref)=>{
      if(ref){
     ref.current.click()
      }
     }

     const handleImageChange = (e,key)=>{
        console.log(key)
      const file = e.target.files[0]
      const imageUrl=URL.createObjectURL(file)
         
      setImages((prev)=>({
        ...prev ,[key]:imageUrl
      }))       
      // console.log(file)
      onChange(file,key)
      //  onChange= setProp((prev)=>({...prev, [key]:file}))
     }
      
    //  console.log(images.imageOne,"this ") 
    //  console.log(prop,"this is original file")
  return (
    <>
    <div className='mt-3 p-4 w-full'>
      <span className='mt-2 text-gray-700 font-medium block text-center sm:text-left'>Add Package Images</span>
      <div className='flex flex-wrap justify-center gap-4 mt-4 '>
        
          { images.imageOne ?  
          <div className='relative inline-block'>
          <img src={images.imageOne} alt=" one image is uploaded" 
          className='p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-[450px]'
          />
          <button className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-red-500"
          onClick={()=>setImages((prev)=>({...prev , imageOne:null}))}
          > <X size={20} /></button>
            </div>
          :
          <div  className='p-4 bg-white rounded-lg sm:w-full md:w-[450px]'>
            <div className='p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-[450px] '
             onClick={(e)=>handleClick(imageOneRef)}
            >
              <svg className='text-indigo-500 w-24 mx-auto mb-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
              </svg>
              <div className='flex flex-col items-center text-center'>
                
                  <input className='hidden' type='file' 
                  ref={imageOneRef}
                  onChange={(e) => handleImageChange(e, "imageOne")}    
                   />
                  <div className='bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500'>Select</div>
                
                <div className='text-indigo-500 uppercase mt-2'>Drop your destination image</div>
              </div>
            </div>
          </div>
         }

{ images.imageTwo ?  
          <div className='relative inline-block'>
          <img src={images.imageTwo} alt=" one image is uploaded" 
          className='p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-[450px]'
          />
          <button className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-red-500"
         onClick={()=>setImages((prev)=>({...prev ,imageTwo:null}))}
          > <X size={20} /></button>
          </div>

          :
          <div  className='p-4 bg-white rounded-lg sm:w-full md:w-[450px]'>
            <div className='p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-[450px] '
             onClick={(e)=>handleClick(imageTwoRef)}
            >
              <svg className='text-indigo-500 w-24 mx-auto mb-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
              </svg>
              <div className='flex flex-col items-center text-center'>
                
                  <input className='hidden' type='file' 
                  ref={imageTwoRef}
                  onChange={(e) => handleImageChange(e, "imageTwo")}    
                   />
                  <div className='bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500'>Select</div>
                
                <div className='text-indigo-500 uppercase mt-2'>Drop your destination image</div>
              </div>
            </div>
          </div>
         }

{ images.imageThree ?  
            <div className='relative inline-block'>
          <img src={images.imageThree} alt=" one image is uploaded" 
          className='p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-[450px]'
          />
           <button className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-red-500"
         onClick={()=>setImages((prev)=>({...prev ,imageThree:null}))}
          > <X size={20} /></button>
         </div>
          :
          <div  className='p-4 bg-white rounded-lg sm:w-full md:w-[450px]'>
            <div className='p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-[450px] '
             onClick={(e)=>handleClick(imageThreeRef)}
            >
              <svg className='text-indigo-500 w-24 mx-auto mb-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
              </svg>
              <div className='flex flex-col items-center text-center'>
                
                  <input className='hidden' type='file' 
                  ref={imageThreeRef}
                  onChange={(e) => handleImageChange(e, "imageThree")}    
                   />
                  <div className='bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500'>Select</div>
                
                <div className='text-indigo-500 uppercase mt-2'>Drop your destination image</div>
              </div>
            </div>
          </div>
         }
      </div>
    </div>
    </>
  );
  
}

export default PackageImage;
 