import { Routes, Route } from "react-router-dom";
import SignIn from "./accounts/SignIn";
import SignUp from "./accounts/SignUp";
import Home from "./Home/Home";
import Pending from "./accounts/Pending";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/pending" element={<Pending/>}/>
      </Routes>
    </>
  );
}

export default App;
