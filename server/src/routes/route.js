const express = require('express')
const router = express.Router()
const authorController= require("../Controller/authorController")
const blogController= require("../Controller/blogController")
const auth = require("../middleware/auth")

router.post("/authors", authorController.createAuthor)
router.post("/logIn", authorController.logIn)

router.post("/blogs", auth.authentication, blogController.createBlog)
router.get("/blogs", auth.authentication, blogController.getBlogs)
router.put("/blogs/:blogId", auth.authentication, blogController.updateBlog)
router.delete("/blogs/:blogId", auth.authentication,blogController.deleteById)
router.delete("/blogs", auth.authentication, blogController.deleteByQuery)

module.exports = router