const express = require("express");
const {register,login, agencyFetch, logout, contactUs,authenticatedUser} = require("../Controller/authController");
const authMiddleware = require("../middlewares/authmiddleware");
const upload = require("../middlewares/multer");
const { uploadImage, deleteImage } = require("../Controller/createController");
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/authenticatedUser",authMiddleware,authenticatedUser)
router.delete("/delete-profile-photo",authMiddleware,deleteImage)
router.get("/profile",authMiddleware,agencyFetch)
router.post("/contact-us",authMiddleware,contactUs)
router.post("/upload-profile-photo",authMiddleware,upload.single('image'),uploadImage)
router.post("/logout",logout)


module.exports = router