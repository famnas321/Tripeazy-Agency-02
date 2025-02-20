import { Routes, Route } from 'react-router-dom'
// import './App.css'
import SignIn from './accounts/SignIn'
import SignUp from './accounts/SignUp'
import Pending from './components/Pending'
import Register from './accounts/Register'

function App() {

  return (
    
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/pending' element={<Pending/>}/>
        <Route path='/reg' element={<Register/>}/>
      </Routes>
   
  )
}

export default App
