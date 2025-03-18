import React from 'react';
import { NavLink } from 'react-router-dom';

function OrganizedPackages() {
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
        <div className="flex justify-center">
        <h1 className="text-gray-600">No  Organized Packages Here...🤷‍♂</h1>
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