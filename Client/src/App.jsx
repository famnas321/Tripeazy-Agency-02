
import { Routes, Route } from 'react-router-dom'
// import './App.css'
import SignIn from './accounts/SignIn'
import SignUp from './accounts/SignUp'
import Pending from './components/Pending'



function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/pending' element={<Pending/>}/>

      </Routes>
    </>
  );
}

export default App;
