import React from 'react'
import { NavLink } from 'react-router-dom'
function PackageGuides() {
  return (
    <div>
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
    </div>
    </div>
  )
}

export default PackageGuides
