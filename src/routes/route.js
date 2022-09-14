const express = require('express')
const router = express.Router()
const authorController= require("../Controller/authorController")
const blogController= require("../Controller/blogController")
const auth = require("../middleware/auth.js")

router.post("/authors", authorController.createAuthor)
router.post("/blogs", auth.authentication, blogController.createBlog)
router.get("/blogs", auth.authentication, blogController.getBlogs)
router.put("/blogs/:blogId", auth.authentication, blogController.updateBlog)
router.delete("/blogs/:blogId", auth.authentication,blogController.deleteById)
router.delete("/blogs", auth.authentication, blogController.deleteByQuery)
router.post("/logIn", authorController.logIn)

module.exports = router