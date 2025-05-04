import React, { useState, useRef, useEffect } from 'react';

const CrudPopUp = ({onAction}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (type) => {
    setShowMenu(false);
    onAction(type)
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
    
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <svg
          className="w-6 h-6 text-gray-600 dark:text-gray-200"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M6 10a2 2 0 114.001-.001A2 2 0 016 10zM10 2a2 2 0 110 4 2 2 0 010-4zm0 12a2 2 0 110 4 2 2 0 010-4z" />
        </svg>
      </button>

     
      {showMenu && (
        <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <li>
            <button
              onClick={() => handleAction('edit')}
              className="flex w-full items-center py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ✏️ Edit
            </button>
          </li>
         
          <li>
            <button
              onClick={() => handleAction('delete')}
              className="flex w-full items-center py-2 px-4 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
            >
              🗑️ Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CrudPopUp;
