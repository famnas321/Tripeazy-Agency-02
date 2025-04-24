import React, { useState } from "react";
import NavHome from "./navHome";
import { Component } from "./DashboardCards";
import AccessPopup from "../AccessPopup";

function Home() {
  // const [showPopup, setShowPopup] = useState(false); 

  // const handlePopup = () => {
  //   if (!showPopup) {
  //     setShowPopup(true);
  //   }
  // };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };

  return (
    <div className="flex flex-col min-h-screen" >
      <NavHome />
      <div className="flex-grow p-6 mt-20">
        <Component />
        <h1 className="mt-6 text-xl font-bold">It's Home Page</h1>
      </div>

      {/* {showPopup && <AccessPopup onClose={handleClosePopup} />} */}
    </div>
  );
}

export default Home;
