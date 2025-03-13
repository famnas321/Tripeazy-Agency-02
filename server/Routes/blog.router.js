const express = require("express");
const { getBlogById } = require("../Controller/blogController");
const router = express();



router.get("/:id",getBlogById);

module.exports = router