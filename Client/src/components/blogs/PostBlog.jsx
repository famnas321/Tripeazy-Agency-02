// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ImageUploader from "../ImageUploader";
// function PostBlog() {
//   const [formData, setformData] = useState({});
//  return (
//   <>
//    {/* <ImageUploader formData={formData} setformData={setformData} type='blog' /> */}
//   </>
//  )
// }

// export default PostBlog;




import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
// import logo from "../assets/logo.png";

const PostBlog = () => {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState(""); // Use an empty string for location
  const navigate = useNavigate();

  const handleClose = () => navigate("/blogs");

  const handleAddCategory = () => {
    if (inputValue.trim()) {
      setCategory(inputValue.trim());
      setInputValue("");
    }
  };

  const uploadImage = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", type);
      const { data } = await axios.post(
        `${API_BASE_URL}/api/agency/auth/blog-upload`,
        formData,
        { withCredentials: true }
      );

      if (type === "thumbnail") setThumbnailUrl(data.imageUrl);
      return { success: 1, file: { url: data.imageUrl } };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.response?.data?.message || "Error uploading image. Please try again.");
      return { success: 0 };
    }
  };

  const handleDeleteImage = async (imageUrl, type) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/delete`, {
        withCredentials: true,
        data: { image: imageUrl, type },
      });
      if (type === "thumbnail") setThumbnailUrl("");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error.response?.data?.message || "Error deleting image. Please try again.");
    }
  };

  const handleSaveBlog = async () => {
    if (!title || !thumbnailUrl) {
      toast.error("Please add a title and thumbnail before saving.");
      return;
    }

    setIsSaving(true);

    try {
      const content = await editorInstance.current?.save();
      const blogData = { title, content, thumbnail: thumbnailUrl, category, location };

      const response = await axios.post(
        `${API_BASE_URL}/api/agency/auth/blog`,
        blogData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Blog posted successfully");
        setTitle("");
        setThumbnailUrl("");
        setCategory("");
        setInputValue("");
        setLocation("");
        editorInstance.current?.clear();
      } else {
        toast.error("Unexpected response from the server. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save blog. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Write your blog content here...",
        tools: {
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: { uploadByFile: (file) => uploadImage(file, "blog") },
            },
          },
        },
      });
    }
  }, []);

  return (
    <>
    
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          {/* <img src={logo} alt="logo" className="w-5 h-5" /> */}
          <h1 className="text-2xl font-title font-bold text-blue-900 ">Write your blog here</h1>
          <button onClick={handleClose} className="text-gray-700">
            <X className="w-8 h-8" />
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-4 border rounded text-2xl font-bold"
        />

        <div className="border p-4 rounded">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0], "thumbnail")}
            className="w-full p-2 border rounded"
          />
          {thumbnailUrl && (
            <div className="relative">
              <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-48 object-cover mt-2 rounded" />
              <button
                onClick={() => handleDeleteImage(thumbnailUrl, "thumbnail")}
                className="absolute top-2 right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center"
              >
                X
              </button>
            </div>
          )}
        </div>

        <div className="border p-4 rounded">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (optional)"
            className="w-full p-2 border rounded"
          />
        </div>

        <div id="editorjs" className="p-4 pb-0 border rounded"></div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a category"
              className="p-2 border rounded flex-1"
            />
            <Button onClick={handleAddCategory} className="p-2 text-white rounded">
              Add
            </Button>
          </div>
          {category && (
            <div className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1">
              <span>{category}</span>
              <button onClick={() => setCategory("")} className="ml-2 text-gray-600 hover:text-gray-900">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <Button onClick={handleSaveBlog} disabled={isSaving} className="mt-4 p-2 text-white rounded">
          {isSaving ? "Saving..." : "Publish Blog"}
        </Button>
      </div>
    </div>
    </>
  );
};

export default PostBlog;



// import React, { useState } from "react";
// import axios from "axios";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { ToastContainer, toast } from "react-toastify";
// import Feature from "../features";
// import MapComponent from "../Map";
// import ImageUploader from "../ImageUploader";

// const PostBlog = () => {
//   const [errors, setErrors] = useState({});
//   const [formData, setformData] = useState({
//     propertyType: "apartment",
//     size: "",
//     price: "",
//     description: "",
//     bedrooms: 0,
//     kitchen: 0,
//     bathrooms: 0,
//     houseDateTime: null,
//     maxGuests: 0,
//     maxStay: 0,
//     location: { lat: 11.25390467304297, lng: 75.7804084176639 },
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     street: "",
//     searchQuery: "",
//     mapType: "satellite",
//     features: [],
//     featurestext: "",
//     editfeatures: null,
//     images: [],
//   });


//   const handleDateTimeChange = (dateTime) => {
//     setformData({ ...formData, houseDateTime: dateTime });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };

//   const increment = (field) => {
//     setformData((prev) => ({ ...prev, [field]: prev[field] + 1 }));
//   };

//   const decrement = (field) => {
//     setformData((prev) => ({
//       ...prev,
//       [field]: Math.max(prev[field] - 1, 1),
//     }));
//   };

//   const handleCancel = () => {
//     setformData({
//       propertyType: "apartment",
//       size: "",
//       price: "",
//       description: "",
//       bedrooms: 0,
//       kitchen: 0,
//       bathrooms: 0,
//       houseDateTime: null,
//       maxGuests: 0,
//       maxStay: 0,
//       location: { lat: 11.25390467304297, lng: 75.7804084176639 },
//       address: "",
//       searchQuery: "",
//       mapType: "satellite",
//       features: [],
//       featurestext: "",
//       editfeatures: null,
//       images: [], 
//     });
//   };

//   const validateFields = () => {
//     const tempErrors = {};
//     if (!formData.size) tempErrors.size = "Size is required";
//     if (!formData.price) tempErrors.price = "Price is required";
//     if (!formData.description)
//       tempErrors.description = "Description is required";
//     if (!formData.location.lat || !formData.location.lng)
//       tempErrors.location = "Location is required";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const housingSubmit = async (e) => {
//     e.preventDefault();
//     if (validateFields()) {
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/host/auth/add",
//           { data: formData, type: 'property' },
//           { withCredentials: true }
//         );
//         toast.success("Property details submitted successfully!");
//         handleCancel();
//       } catch (error) {
//         console.error("Error:", error);
//         toast.error("Failed to submit property details.");
//       }
//     }
//   };

//   return (
//     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
//       <div>
//         <h2 className="text-lg font-semibold mb-4">Property Details</h2>
//         <form onSubmit={housingSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="property-type"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Property Type
//             </label>
//             <select
//               id="property-type"
//               name="propertyType"
//               value={formData.propertyType}
//               onChange={handleInputChange}
//               className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
//             >
//               <option value="apartment">Apartment</option>
//               <option value="house">House</option>
//               <option value="studio">Studio</option>
//               <option value="villa">Villa</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="size"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Size
//             </label>
//             <input
//               type="number"
//               id="size"
//               name="size"
//               value={formData.size}
//               onChange={handleInputChange}
//               min="0"
//               className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
//               placeholder="Enter size"
//             />
//             {errors.size && (
//               <p className="text-red-500 text-sm mt-1">{errors.size}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="price"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Price per Day
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               min="0"
//               className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
//               placeholder="Enter price per day"
//             />
//             {errors.price && (
//               <p className="text-red-500 text-sm mt-1">{errors.price}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows="3"
//               className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
//               placeholder="Enter description"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-semibold text-gray-700">
//               Event Date and Time
//             </label>
//             <DateTimePicker
//               sx={{ width: "100%" }}
//               value={formData.houseDateTime}
//               onChange={handleDateTimeChange}
//               textFeild={(params) => (
//                 <input
//                   {...params}
//                   className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-pink-700 focus:outline-none text-pink-900"
//                 />
//               )}
//             />
//             {errors.houseDateTime && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.houseDateTime}
//               </p>
//             )}
//           </div>

//           {["bedrooms", "kitchen", "bathrooms", "maxGuests", "maxStay"].map(
//             (field) => (
//               <div
//                 key={field}
//                 className="border rounded-lg p-2 flex items-center justify-between bg-white mb-4"
//               >
//                 <label className="text-lg font-semibold text-gray-800 mr-4 pl-1">
//                   {field.charAt(0).toUpperCase() +
//                     field.slice(1).replace(/([A-Z])/g, " $1")}
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => decrement(field)}
//                     className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition duration-200"
//                   >
//                     <span className="text-2xl font-bold">-</span>
//                   </button>
//                   <input
//                     type="number"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleInputChange}
//                     className="w-16 text-center font-semibold text-xl px-3 py-1 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => increment(field)}
//                     className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition duration-200"
//                   >
//                     < span className="text-2xl font-bold">+</span>
//                   </button>
//                 </div>
//               </div>
//             )
//           )}
//         </form>
//         <Feature formData={formData} setformData={setformData} />
//       </div>
//       {/* map section  */}
//       <div>
//         <ImageUploader formData={formData} setformData={setformData} type='housing' />
//         <MapComponent formData={formData} setformData={setformData} />

//         <div className="mt-4">
//           <p>Location: {formData.address}</p>
//           <p>Latitude: {formData.location.lat}</p>
//           <p>Longitude: {formData.location.lng}</p>
//         </div>

//         <div className="flex space-x-4 mt-4">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none flex-1"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             onClick={housingSubmit}
//             className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none flex-1"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default PostBlog;