const express = require("express");
const {register,login, agencyFetch, logout} = require("../Controller/authController");
const authMiddleware = require("../middlewares/authmiddleware");
const upload = require("../middlewares/multer");
const { uploadImage } = require("../Controller/createController");
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/profile",authMiddleware,agencyFetch)
router.post("/upload-profile-photo",authMiddleware,upload.single('image'),uploadImage)
router.post("/logout",logout)

module.exports = router