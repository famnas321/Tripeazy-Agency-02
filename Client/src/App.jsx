import { Routes, Route } from 'react-router-dom'
// import './App.css'
import SignIn from './accounts/SignIn'
import Pending from "./accounts/Pending"
import Register from './accounts/Register'
import Home from "./components/Home/Home"
import Clients from './components/clients/clients'
import NavbarLayout from "./components/navbar/navbar-layout"
import Post from './components/posts/post'
import Blog from './components/blogs/blogCard'
import Messages from './components/messages/messages'
import Contact from './components/contacts/contact'
import Addvertisment from './components/addvertisment/addvertisment'
import Profiles from './components/profile/profiles'
import PostBlog from './components/blogs/PostBlog'
import Addpackage from './components/posts/Addpackage'
import Blogshow from './components/blogs/blogShow'




function App() {
  return (
    <>
      <Routes>

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/pending" element={<Pending/>}/>

        <Route element={<NavbarLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path='/clients' element={<Clients/>}/>
          <Route path='posts' element={<Post/>}/>
          <Route path='blogs' element={<Blog/>}/>
          <Route path='messages' element={<Messages/>}/>
          <Route path='contact-us' element={<Contact/>}/>
          <Route path='advertisments' element={<Addvertisment/>}/>
          <Route path='profile' element={<Profiles/>}/>
          <Route path="/blogs/post-blog" element={<PostBlog />} />
          <Route path="/addPackage" element={<Addpackage/>}/>
          <Route path="/blogs/:id" element={<Blogshow/>}/>

        </Route>
        



      </Routes>
    </>
  );
}

export default App;