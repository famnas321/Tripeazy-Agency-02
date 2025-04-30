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
  const [thumbnailFile, setThumbnailFile] = useState(null); // Store thumbnail file locally
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [blogImages, setBlogImages] = useState([]); // Store blog content images locally
  const navigate = useNavigate();

  const handleClose = () => navigate("/blogs");

  const handleAddCategory = () => {
    if (inputValue.trim()) {
      setCategory(inputValue.trim());
      setInputValue("");
    }
  };

  // Upload all images to Cloudinary
  const uploadImagesToCloudinary = async (files) => {
    const uploadedImages = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", "blog");
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/api/agency/auth/blog-upload`,
          formData,
          { withCredentials: true }
        );
        uploadedImages.push(data.imageUrl); // Store Cloudinary URLs
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again.");
        return null;
      }
    }
    return uploadedImages;
  };

  // Handle blog publishing
  const handleSaveBlog = async () => {
    if (!title || !thumbnailFile) {
      toast.error("Please add a title and thumbnail before saving.");
      return;
    }

    setIsSaving(true);

    try {
      // Upload thumbnail and blog images to Cloudinary
      const thumbnailUrl = (await uploadImagesToCloudinary([thumbnailFile]))[0];
      const blogImageUrls = await uploadImagesToCloudinary(blogImages);

      if (!thumbnailUrl || !blogImageUrls) {
        toast.error("Failed to upload images. Please try again.");
        return;
      }

      // Save blog content with updated image URLs
      const content = await editorInstance.current?.save();
      const blogData = {
        title,
        content,
        thumbnail: thumbnailUrl,
        category,
        location,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/agency/auth/blog`,
        blogData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Blog posted successfully");
        setTitle("");
        setThumbnailFile(null);
        setCategory("");
        setInputValue("");
        setLocation("");
        setBlogImages([]);
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

  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  // Handle blog content image selection
  const handleBlogImageUpload = async (file) => {
    setBlogImages((prev) => [...prev, file]);
    return { success: 1, file: { url: URL.createObjectURL(file) } }; // Return a local URL for preview
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
              uploader: { uploadByFile: handleBlogImageUpload },
            },
          },
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
            onChange={handleThumbnailChange}
            className="w-full p-2 border rounded"
          />
          {thumbnailFile && (
            <div className="relative">
              <img
                src={URL.createObjectURL(thumbnailFile)}
                alt="Thumbnail Preview"
                className="w-full h-48 object-cover mt-2 rounded"
              />
              <button
                onClick={() => setThumbnailFile(null)}
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
  );
};

export default PostBlog;



