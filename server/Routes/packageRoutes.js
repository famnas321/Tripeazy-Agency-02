const express = require("express")
const router= express.Router()

const {addOrganizedPackage,getOrganizedPackages} = require("../Controller/organizedPackageContoller")
const authMiddleware =require("../middlewares/authmiddleware")
const upload = require("../middlewares/multer")
const {addPackages,fetchPackages,updateLike} = require("../Controller/packageController")

router.post("/addPackages",authMiddleware,upload.array("image"),addPackages)
router.get("/fetchPackages",authMiddleware,fetchPackages)

router.post("/organizedPackages",authMiddleware,upload.array("image"),addOrganizedPackage)
router.get("/getOrganizedPackages",authMiddleware,getOrganizedPackages)
router.put("/likes",authMiddleware,updateLike)

module.exports=router
