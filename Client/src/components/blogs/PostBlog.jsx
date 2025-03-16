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

const PostBlog = () => {
  const editorInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Store image file
  const [thumbnailPreview, setThumbnailPreview] = useState(""); // Store preview URL
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleClose = () => navigate("/blogs");

  const handleAddCategory = () => {
    if (inputValue.trim()) {
      setCategory(inputValue.trim());
      setInputValue("");
    }
  };

  // Handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(file); // Store file in state
      setThumbnailPreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  // Remove selected image
  const handleDeleteImage = () => {
    setThumbnail(null);
    setThumbnailPreview("");
  };

  // Upload image & save blog when published
  const handleSaveBlog = async () => {
    if (!title || !thumbnail) {
      toast.error("Please add a title and thumbnail before saving.");
      return;
    }

    setIsSaving(true);
    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("image", thumbnail);
      formData.append("type", "thumbnail");
      
      const uploadResponse = await axios.post(
        `${API_BASE_URL}/api/agency/auth/blog-upload`,
        formData,
        { withCredentials: true }
      );

      const uploadedImageUrl = uploadResponse.data.imageUrl; // Get uploaded image URL

      const content = await editorInstance.current?.save();
      const blogData = { 
        title, 
        content, 
        thumbnail: uploadedImageUrl, 
        category, 
        location 
      };

      // Save blog to DB
      const response = await axios.post(
        `${API_BASE_URL}/api/agency/auth/blog`,
        blogData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Blog posted successfully");
        setTitle("");
        setThumbnail(null);
        setThumbnailPreview("");
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
          image: ImageTool,
        },
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-title font-bold text-blue-900">Write your blog here</h1>
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
            onChange={handleImageSelect} 
            className="w-full p-2 border rounded" 
          />
          {thumbnailPreview && (
            <div className="relative">
              <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-48 object-cover mt-2 rounded" />
              <button 
                onClick={handleDeleteImage} 
                className="absolute top-2 right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center">
                X
              </button>
            </div>
          )}
        </div>

        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Enter location (optional)" 
          className="w-full p-2 border rounded" 
        />

        <div id="editorjs" className="p-4 pb-0 border rounded"></div>

        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Add a category" 
            className="p-2 border rounded flex-1" 
          />
          <Button onClick={handleAddCategory} className="p-2 text-white rounded">Add</Button>
        </div>
        
        {category && (
          <div className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1">
            <span>{category}</span>
            <button onClick={() => setCategory("")} className="ml-2 text-gray-600 hover:text-gray-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <Button 
          onClick={handleSaveBlog} 
          disabled={isSaving} 
          className="mt-4 p-2 text-white rounded"
        >
          {isSaving ? "Saving..." : "Publish Blog"}
        </Button>
      </div>
    </div>
  );
};

export default PostBlog;
