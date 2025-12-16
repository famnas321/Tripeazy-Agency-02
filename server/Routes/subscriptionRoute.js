const express = require("express")
const authMiddleware = require("../middlewares/authmiddleware")
const {subscription,addsubscriptionStatus} = require("../Controller/subscriptionController")
const router= express.Router()

router.post("/create-payment-intent",authMiddleware,subscription)
router.put("/add-payment-intent",authMiddleware,addsubscriptionStatus)


module.exports = router