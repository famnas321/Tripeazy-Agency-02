const Blog = require("../model/Blog")

exports.getBlogById = async (req, res) => {
    try {
      
      const blog = await Blog.findById(req.params.id)
        .select("id title thumbnail createdAt content location author likes")
        .populate("author", "username image");
  
      if (!blog) return res.status(404).json({ error: "Blog not found" });
  
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  