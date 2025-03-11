import React from "react";
import NavHome from "./navHome";
import { Component } from "./DashboardCards";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHome/>
      <div className="flex-grow p-6 mt-20">
        <Component />
        <h1 className="mt-6 text-xl font-bold">It's Home Page</h1>
      </div>
    </div>
  );
}

export default Home;
