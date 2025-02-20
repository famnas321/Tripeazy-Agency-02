import { Routes, Route } from "react-router-dom";
import SignIn from "./accounts/SignIn";
import SignUp from "./accounts/SignUp";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
