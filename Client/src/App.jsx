import { Routes, Route } from 'react-router-dom'
// import './App.css'
import SignIn from './accounts/SignIn'
import SignUp from './accounts/SignUp'


function App() {

  return (
    
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
   
  )
}

export default App
