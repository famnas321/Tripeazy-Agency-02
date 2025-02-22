import { Routes, Route } from 'react-router-dom'
// import './App.css'
import SignIn from './accounts/SignIn'
import Pending from "./accounts/Pending"
import Register from './accounts/Register'
import Home from "./Home/Home"
import NavbarLayout from "./navbar/navbar-layout"



function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/pending" element={<Pending/>}/>
        <Route element={<NavbarLayout/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
        

      </Routes>
    </>
  );
}

export default App;