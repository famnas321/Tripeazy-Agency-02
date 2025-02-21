
import { Routes, Route } from 'react-router-dom'
// import './App.css'
import SignIn from './accounts/SignIn'
import Pending from './components/Pending'
import Register from './accounts/Register'


function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/pending' element={<Pending/>}/>

      </Routes>
    </>
  );
}

export default App;
