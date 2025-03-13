import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [savedBlogs, setSavedBlogs] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, search]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/agency/auth/fetch-blogs`, {
        params: { category: selectedCategory, search },
        withCredentials: true,
      });

      const blogsData = Array.isArray(response.data) ? response.data : [];
      setBlogs(blogsData);
      extractCategories(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const extractCategories = (blogs) => {
    if (!Array.isArray(blogs)) return;
    const uniqueCategories = [...new Set(blogs.map((blog) => blog.category || "Uncategorized"))];
    setCategories(uniqueCategories);
  };

  const toggleLike = (id) => {
    setLikedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id) => {
    setSavedBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Explore Blogs</h2>
        <Link to="/agency/post-blog" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Post New Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search blogs..."
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Blog List */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading blogs...</p>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="relative bg-white border rounded-lg shadow-lg cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105"
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              {/* Blog Image */}
              <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover" />

              {/* Blog Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{blog.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{blog.description || "No description available."}</p>
                <p className="text-gray-600 text-sm">📍 {blog.location}</p>
                <p className="text-gray-600 text-sm">❤️ {blog.likes}</p>
              </div>

              {/* Like & Save Icons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(blog._id);
                  }}
                  className="text-red-500 text-xl"
                >
                  {likedBlogs[blog._id] ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(blog._id);
                  }}
                  className="text-blue-600 text-xl"
                >
                  {savedBlogs[blog._id] ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No blogs available. Start by posting one!</p>
      )}
    </div>
  );
}

export default Blogs;
