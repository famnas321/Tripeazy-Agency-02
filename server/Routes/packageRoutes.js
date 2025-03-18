const express = require("express")
const router= express.Router()

const authMiddleware =require("../middlewares/authmiddleware")
const upload = require("../middlewares/multer")
const {addPackages} = require("../Controller/packageController")

router.post("/addPackages",authMiddleware,upload.array("image"),addPackages)

module.exports=router