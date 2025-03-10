import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function blogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, search]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/agency/auth/fetch-blogs`, {
        params: { category: selectedCategory, search },withCredentials: true
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog, index) => (
            <div key={blog._id || index} className="border p-4 rounded shadow-lg">
              <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm">Location: {blog.location}</p>
              <p className="text-gray-600 text-sm">Likes: {blog.likes}</p>
              <Link to={`/blogs/${blog._id}`} className="text-blue-500 mt-2 block">
                Read More
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No blogs available. Start by posting one!</p>
      )}
    </div>
  );
}

export default blogs;
