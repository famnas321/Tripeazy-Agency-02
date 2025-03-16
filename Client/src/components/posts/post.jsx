import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Packages", path: "/posts" },
  { name: "Organized", path: "" },
  { name: "Guides", path: "/expert-guides" },
];

const Navigation = () => {
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
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500 hover:font-semibold"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      <div className="mb-5 flex justify-center">
        <hr className="w-1/2" />
      </div>
        <div className="flex justify-center">
        <h1 className="text-gray-600">No Packages Here...🤷‍♂</h1>
        </div>
        
      
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