const express = require("express")
const authMiddleware = require("../middlewares/authmiddleware");
const upload = require("../middlewares/multer")
const { uploadImage, deleteImage, BlogPost, fetchBlog } = require("../Controller/createController")
const router = express.Router();

router.post("/upload",authMiddleware, upload.single('image'),uploadImage)
router.delete("/delete",authMiddleware,deleteImage)
router.post("/blog-upload",authMiddleware,upload.single('image'),uploadImage)
router.post("/blog",authMiddleware,BlogPost)
router.get("/fetch-blogs",authMiddleware,fetchBlog)


module.exports = router