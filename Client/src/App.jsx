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
import PackageGuides from './components/posts/PackageGuides'
import OrganizedPackages from './components/posts/OrganizedPackages'
import AddOrganizedPackage from './components/posts/AddOrganizedPackage'
import Sample from './components/posts/Sample'
import MorePackage from './components/posts/MorePackage'

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
          <Route path="/posts/package/organized" element={<OrganizedPackages/>}/>
          <Route path="/posts/package/guides" element={<PackageGuides/>}/>
          <Route path="/posts/package/addOrganizedPackage" element={<AddOrganizedPackage/>}/>
          <Route path="/blogs/:id" element={<Blogshow/>}/>
          <Route path="/sample" element={<Sample/>}/>
          <Route path="/posts/organized/more" element={<MorePackage/>}/>

        </Route>
        



      </Routes>
    </>
  );
}

export default App;