const cloudinary = require("../config/cloudinary");
const Agency = require("../model/AgencyModel");
require("dotenv").config();
const Blog = require("../model/Blog")






exports.uploadImage = async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
      }

      const folderMap = {
          profile: "profile-images",
          blog: "blogs",
          package: "packages",
      };

      const folder = folderMap[req.body.type] || "default-images";

      // 🔥 Upload image directly from memory buffer
      const { secure_url: imageUrl, public_id } = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
              { folder },
              (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
              }
          ).end(req.file.buffer);
      });

      if (req.body.type === "profile") {
          await Agency.findByIdAndUpdate(
              req.user.id,
              { $set: { image: imageUrl } },
              { new: true }
          );
      }

      res.status(200).json({ imageUrl, public_id, type: req.body.type });
  } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Server error" });
  }
};


// exports.uploadImage = async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }
  
//       const folderMap = {
//         profile: "profile-images",
//         blog: "blogs",
//         package: "packages",
//       };
  
//       const folder = folderMap[req.body.type] || "default-images";
  
//       const { secure_url: imageUrl, public_id } = await cloudinary.uploader.upload(req.file.path, { folder });
  
//       if (req.body.type === "profile") {
       
        
//         const updatedUser = await Agency.findByIdAndUpdate(
//           req.user.id,  
//           { $set: { image: imageUrl } },  // 🔥 Use `$set` to ensure only `image` field updates
//           { new: true }
//       );
     
//       }
  
//       res.status(200).json({ imageUrl, public_id, type: req.body.type });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       res.status(500).json({ message: "Server error" });
//     }
//   };





  exports.deleteImage = async (req, res) => {
    try {
      const { image, type } = req.body;
      console.log(req.body,"req.body of delete image")
      if (!image || !type) return res.status(400).json({ message: "No image or type provided" });
  
      const models = { profile: Agency,  };
      const model = models[type];
      if (!model) return res.status(400).json({ message: "Invalid type" });
  
      const record = await model.findById(req.user.id);
      const publicId = image.split("/").pop().split(".")[0];
      const folder = `${type}-images`;
  
      if (record?.image === image) {
        await cloudinary.uploader.destroy(`${folder}/${publicId}`);
        await model.findByIdAndUpdate(req.user.id, { image: null }, { new: true });
        return res.status(200).json({ message: "Image deleted from both database and Cloudinary" });
      }
  
      await cloudinary.uploader.destroy(`${folder}/${publicId}`);
      return res.status(200).json({ message: "Image deleted from Cloudinary" });
  
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.BlogPost = async (req, res) => {
    const { title, content, thumbnail, categories,location } = req.body;
  
    try {
      const newBlog = new Blog({
        title,
        content,
        thumbnail,
        categories,
        location,
        author: req.user.id,
      });
  
      await newBlog.save();
      res.status(201).json({ message: "Blog saved successfully!", blog: newBlog });
    } catch (error) {
      console.error("Error saving blog:", error);
      res.status(500).json({ message: "Error saving blog.", error });
    }
  };


 

  exports.fetchBlog = async (req, res) => {
    try {
      console.log("request hitted here")
      const { category, search } = req.query;
      let query = {};
  
      // Apply category filter if provided
      if (category) {
        query.category = category;
      }
  
      // Apply search filter (searches in title and content)
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
          { content: { $regex: search, $options: "i" } } // Case-insensitive search in content
        ];
      }
  
      // Fetch blogs from MongoDB with sorting (latest blogs first)
      const blogs = await Blog.find(query).sort({ createdAt: -1 });
  
      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  