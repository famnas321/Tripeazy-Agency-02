// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// import {
//   Home,
//   FileText,
//   MessageCircle,
//   Plus,
//   Menu,
//   X,
//   Wallet,
//   Settings,
//   MessagesSquare,
//   Bell,
//   ClipboardList,
//   CalendarDays,
//   User,
// } from "lucide-react"
// // import { Avatar, AvatarImage } from "../ui/avatar";

// export default function Navigation() {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return isMobile ? <MobileNavbar /> : <DesktopSidebar />;
// }

// function MobileNavbar() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
//   const navigate = useNavigate();
// //   const userinfo = useSelector((state) => state.auth.userInfo);
// //   const [image, setImage] = useState(userinfo?.image || null);
// //   const [firstName, setFirstName] = useState(userinfo?.firstName || "");
// //   const [email, setEmail] = useState(userinfo?.email || "");

//   const handleNavLinkClick = () => {
//     setIsSidebarOpen(false);
//     setIsBottomNavVisible(false);
//   };
//   const handleAvatarClick = () => {
//     navigate("/profile");
//   };

//   return (
//     <>
  
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 z-50`}
//       >
//         <button
//           className="p-4 text-black hover:text-blue-500"
//           onClick={() => setIsSidebarOpen(false)}
//         >
//           <X className="w-6 h-6" />
//         </button>
//         <nav className="flex flex-col space-y-6 px-6 pb-6 pt-3">
//           <NavLink
//             to="/home"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//           >
//             <Home className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">Home</span>
//           </NavLink>
//           <NavLink
//             to="/messages"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <MessagesSquare className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">Messages</span>
//           </NavLink>
//           <NavLink
//             to="/booking"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <CalendarDays className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">Bookings</span>
//           </NavLink>
//           <NavLink
//             to="/post"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <Plus className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">Post</span>
//           </NavLink>
//           <NavLink
//             to="/payment"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <Wallet className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">Payment</span>
//           </NavLink>

//           <NavLink
//             to="/notifications"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <Bell className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">
//               Notifications
//             </span>
//           </NavLink>
//           <NavLink
//             to="/booked"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <ClipboardList className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">Booked</span>
//           </NavLink>
//           <NavLink
//             to="/account"
//             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <Settings className="w-5 h-5 text-black" />
//             <span className="text-black text-lg font-medium">Account</span>
//           </NavLink>
//         </nav>
//       </div>
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}
//       {isBottomNavVisible && (
//         <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-slate-100 px-4 shadow-lg flex justify-between items-center">
//           <button
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300"
//             onClick={() => setIsSidebarOpen(true)}
//           >
//             <Menu className="w-6 h-6 text-black" />
//           </button>
//           <NavLink
//             to="/booking"
//             className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <FileText className="w-6 h-6 text-black" />
//           </NavLink>
//           <NavLink
//             to="/post"
//             className="absolute bottom-7 left-1/2 transform -translate-x-1/2 bg-blue-500 p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <Plus className="w-6 h-6 text-white" />
//           </NavLink>
//           <NavLink
//             to="/messages"
//             className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 transition duration-300"
//             onClick={handleNavLinkClick}
//           >
//             <MessageCircle className="w-6 h-6 text-black" />
//           </NavLink>

//           {/* <User
//             className="h-6 w-6 md:w-6 md:h-6 rounded-full overflow-hidden cursor-pointer"
//             onClick={handleAvatarClick}
//           > */}
//             {/* {image ? (
//               <AvatarImage
//                 // src={image}
//                 alt="profile"
//                 className="object-cover w-full h-full bg-black"
//               />
//             ) : (
//               <div className="uppercase h-6 w-6 md:w-6 md:h-6 text-2xl border-[1px] flex items-center justify-center">
//                 {(firstName || email)?.charAt(0)}
//               </div>
//             )} */}
//           {/* </User> */}
//         </div>
//       )}
//     </>
//   );
// }

// function DesktopSidebar() {
// //   const userinfo = useSelector((state) => state.auth.userInfo);
// //   const [image, setImage] = useState(userinfo?.image || null);
// //   const [firstName, setFirstName] = useState(userinfo?.firstName || "");
// //   const [email, setEmail] = useState(userinfo?.email || "");
//   const [isHovered, setIsHovered] = useState(false);

// //   const firstNameInitial = firstName.charAt(0) || email.charAt(0) || "";

//   return (
//     <div
//       className={`hidden md:flex flex-col ${
//         isHovered ? "w-64" : "w-18"
//       } text-slate-800 h-full transition-all duration-300 top-0 sticky z-10`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <NavLink to="/profile">
//         <div className="flex items-center gap-4 p-3 pt-6 pb-6 pl-4 border-b">
//           {/* <User className="w-10 h-10 rounded-full overflow-hidden">
//             {image ? (
//               <AvatarImage
//                 src={image}
//                 alt="Profile"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <div className="uppercase h-full w-full text-3xl flex items-center justify-center border">
//                 {firstNameInitial}
//               </div>
//             )}
//           </User> */}
//           {isHovered && <h1 className="text-2xl font-title font-bold">Travela</h1>}
//         </div>
//       </NavLink>

//       <nav className="flex-1 m-3 space-y-4">
//         <NavItem to="/home" icon={Home} label="Home" isHovered={isHovered} />
//         <NavItem
//           to="/messages"
//           icon={MessageCircle}
//           label="Messages"
//           isHovered={isHovered}
//         />

//         <NavItem
//           to="/booking"
//           icon={CalendarDays}
//           label="Booking"
//           isHovered={isHovered}
//         />

//         <NavItem to="/post" icon={Plus} label="Post" isHovered={isHovered} />
//         <NavItem
//           to="/payment"
//           icon={Wallet}
//           label="Payment"
//           isHovered={isHovered}
//         />

//         <NavItem
//           to="/notification"
//           icon={Bell}
//           label="Notification"
//           isHovered={isHovered}
//         />
//         <NavItem
//           to="/booked"
//           icon={ClipboardList}
//           label="Booked"
//           isHovered={isHovered}
//         />

//         <NavItem
//           to="/account"
//           icon={Settings}
//           label="Profile"
//           isHovered={isHovered}
//         />
//       </nav>
//     </div>
//   );
// }

// function NavItem({ to, icon: Icon, label, isHovered }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-4 p-3 rounded-xl ${
//           isActive ? "bg-blue-600 text-white" : ""
//         }`
//       }
//     >
//       <Icon className={`${isHovered ? "text-[1.375rem]" : "text-xl"}`} />
//       {isHovered && <span>{label}</span>}
//     </NavLink>
//   );
// }


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaBell,
  FaPlus,
  FaUser,
  FaEnvelope,
  FaPenNib,
  FaPhoneAlt,
  FaRegCalendarAlt,
  FaBullhorn,
} from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";


const UserNavbar = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      
      <div className="hidden md:flex flex-col w-64 text-slate-800 h-full ">
        <div className="flex items-center justify-center h-20 border-b-2">
          
          <h1 className="text-2xl font-bold">Tripeazy</h1>
        </div>
        <nav className="flex-1 p-4 space-y-4 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          >
            <FaHome />
            Home
          </NavLink>
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          >
            <FaUsers />
            Clients
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          >
            <MdPostAdd size={20} className="ml-0"/>
            Posts
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          > 
            <FaPenNib size={20}/>
            Blogs
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          >
            <FaEnvelope />
            Messages
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          >
            <FaPhoneAlt />
            Contact Us
          </NavLink>
          <NavLink
            to="/advertisments"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          >
            <FaBullhorn />
            Advertisments
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-custom-purple text-white" : ""}`
            }
          >
            <FaUser />
            Profile 
          </NavLink>
          
          
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white shadow-lg border-t">
        <nav className="flex justify-around p-2 text-slate-800">
          <button onClick={toggleSidebar} className="flex flex-col items-center gap-1">
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            <span className="text-xs">Menu</span>
          </button>
          
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-blue-500" : ""}`
            }
          >
            <FaEnvelope  size={20}/>
            <span className="text-xs">Messages</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-blue-500" : ""}`
            }
          >
            <FaUser size={20} />
            <span className="text-xs">Profile</span>
          </NavLink>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>
          <div className="fixed inset-y-0 left-0 bg-white w-64 z-50 shadow-lg flex flex-col">
            <div className="flex items-center justify-center h-20 border-b">
              <h1 className="text-2xl font-bold">Super Admin</h1>
            </div>
            <nav className="flex-1 p-4 space-y-4">
              <NavLink
                to="/home"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                to="/clients"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaUsers />
                Clients
              </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
            }
          >
            <FaEnvelope />
            Posts
          </NavLink>
              <NavLink
                to="/blogs"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaHome />
                Blogs
              </NavLink>
              <NavLink
                to="/messages"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaHome />
                messages
              </NavLink>
              <NavLink
                to="/contact-us"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaBell />
                Contact-us
              </NavLink>
              <NavLink
                to="/advertisments"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}`
                }
              >
                <FaPlus />
                Advertisments
              </NavLink>
              <NavLink
                to="/profile"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-xl ${isActive ? "bg-blue-600 text-white" : ""}` 
                }
              >
                <FaUser />
                Profile
              </NavLink>
             
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default UserNavbar;
