const express = require("express");
const {register,login, agencyFetch, logout} = require("../Controller/authController");
const authMiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/profile",authMiddleware,agencyFetch)
router.post("/logout",logout)

module.exports = router