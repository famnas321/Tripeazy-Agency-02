import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
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
import OganizedMore from './components/posts/OganizedMore'
import MorePackage from './components/posts/MorePackage'
import RestrictRoute from './components/RestrictRoute'
import PrivateRoute from './components/PrivateRoute'
import NoAccessPage from './Additional/NoAccessPage'

import { authUser } from './services/authService'
import { setUserInfo } from './redux/reducers/authSlices'
import { ScaleLoader } from 'react-spinners'


function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const authData = useSelector((state) => state.auth.userInfo);
  console.log(authData, "this is from app")
  useEffect(() => {
    const authentication = async () => {
      setLoading(true)
      try {
        const authResponse = await authUser()
        console.log(authResponse, "this is from appjsx")
        dispatch(setUserInfo(authResponse))


      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    
      authentication()

  }, [dispatch])
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#C0C2C9" aria-label="loading" />
      </div>
    );
  }
  return (
    <>
      <Routes>

        <Route path="/login" element={<PrivateRoute><SignIn /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/pending" element={<Pending />} />

        <Route element={<NavbarLayout />}>

          <Route
            path="/"
            element={<RestrictRoute><Home /></RestrictRoute>} />
          <Route path='/clients' element={<RestrictRoute><Clients /></RestrictRoute>} />
          <Route path='posts' element={<RestrictRoute><Post /></RestrictRoute>} />
          <Route path='blogs' element={<RestrictRoute><Blog /></RestrictRoute>} />
          <Route path='messages' element={<RestrictRoute><Messages /></RestrictRoute>} />
          <Route path='contact-us' element={<RestrictRoute><Contact /></RestrictRoute>} />
          <Route path='advertisments' element={<RestrictRoute><Addvertisment /></RestrictRoute>} />
          <Route path='profile' element={<RestrictRoute><Profiles/></RestrictRoute>} />
          <Route path="/blogs/post-blog" element={<RestrictRoute><PostBlog /></RestrictRoute>} />
          <Route path="/posts/package/addPackage" element={<RestrictRoute><Addpackage /></RestrictRoute>} />
          <Route path="/posts/package/organized" element={<RestrictRoute><OrganizedPackages /></RestrictRoute>} />
          <Route path="/posts/package/guides" element={<RestrictRoute><PackageGuides /></RestrictRoute>} />
          <Route path="/posts/package/addOrganizedPackage" element={<RestrictRoute><AddOrganizedPackage /></RestrictRoute>} />
          <Route path="/blogs/:id" element={<RestrictRoute><Blogshow /></RestrictRoute>} />
          <Route path="/posts/oganized/more" element={<RestrictRoute><OganizedMore /></RestrictRoute>} />
          <Route path="/posts/package/more" element={<RestrictRoute><MorePackage /></RestrictRoute>} />
          <Route path="/noAccess" element={<RestrictRoute><NoAccessPage /></RestrictRoute>} />

        </Route>




      </Routes>
    </>
  );
}

export default App;