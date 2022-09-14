const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const mongoose = require("mongoose")

const createBlog = async function (req, res) {
    try {
        let blog = req.body
        let string = /^[a-z\s]{0,255}$/i
        // validate title and its data type
        if(!blog.title) return res.status(400).send("Please provide title")
        let test1 = string.test(blog.title)
        if(!test1) return res.status(400).send("Enter only string in title")
        // validate body and its data type
        if(!blog.body) return res.status(400).send("Please provide body")
        let test2 = string.test(blog.title)
        if(!test2) return res.status(400).send("Enter only string in body")
        // validate authorId
        if(!blog.authorId) return res.status(400).send("Please provide authorId")
        if (!mongoose.Types.ObjectId.isValid(blog.authorId)) 
            return res.status(400).send({ status: false, msg: "Invailid authorId" })
        // check author exist or not
        let authorById = await authorModel.findById(blog.authorId)
        if (!authorById) return res.status(400).send({ status: false, msg: "Author is not exist" })
        // validate category
        if(!blog.category) return res.status(400).send("Please provide category")
        // validate type of isPublished
        if(blog.isPublished){
            if(typeof(blog.isPublished) !== "boolean") 
                return res.status(400).send("Give Boolean value in isPublished")
        }
        if(blog.isPublished == true) {blog["publishedAt"] = Date.now()}
        // create document 
        let blogCreated = await blogModel.create(blog)
        return res.status(201).send({ data: blogCreated })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}



const getBlogs = async function (req, res) {
    try {
        let temp = req.query
        temp.isDeleted=false
        temp.isPublished=true
        if (temp.tags) {
            let tagsarr = temp.tags.trim().split(",").map(tags => tags.trim())
            temp["tags"] = { $all: tagsarr }
        }
        if (temp.category) {
            let categorysarr = temp.category.trim().split(",").map(category => category.trim())
            temp["category"] = { $all: categorysarr }
        }

        if (temp.subcategory) {
            let subcategorysarr = temp.subcategory.trim().split(",").map(subcategory => subcategory.trim())
            temp["subcategory"] = { $all: subcategorysarr }
        }
        let BlogsWithCond = await blogModel.find(temp)
        if(BlogsWithCond.length===0) return res.status(400).send("No blog found")
        res.status(201).send({ data: BlogsWithCond })
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        // validate blogId
        if (!mongoose.Types.ObjectId.isValid(blogId)) 
            return res.status(400).send({ status: false, msg: "Invailid blogId" })
        let blogById = await blogModel.findOne({ _id: blogId , isDeleted: false })
        if (!blogById) return res.status(404).send({ status: false, msg: "Blog is not exist" })
        // authorisation
        let authorId = blogById.authorId.toString()
        if(req.authorId!==authorId) return res.status(400).send("Access Denied")
        // updating
        let newData = req.body
        // validate title and its data type
        if(newData.title){
            if(newData.title.length === 0) return res.send("Please provide something in title")
        }
        // validate body and its data type
        if(newData.body){
            if(newData.body.length === 0) return res.send("Please provide something in title")
        }
        let updatedBlog = await blogModel.findByIdAndUpdate(blogId,
            {$set:{isPublished:true,publishedAt:new Date(),title:newData.title,body:newData.body},
            $push: {tags: newData.tags,subcategory: newData.subcategory}},{new:true})
        res.status(201).send(updatedBlog)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteById = async function (req, res) {
    try{
        let blogId = req.params.blogId
        // validate blogId
        if (!mongoose.Types.ObjectId.isValid(blogId)) 
            return res.status(400).send({ status: false, msg: "Invailid blogId" })
        let blog = await blogModel.findById(blogId)
        if(!blog){
            res.status(404).send({ msg: "Invailid blogId" })
        }
        // authorisation
        let authorId = blog.authorId.toString()
        if(req.authorId!==authorId) return res.status(400).send("Access Denied")
        // check blog is already deleted or not
        if(blog.isDeleted == true){
            res.status(404).send("Blog not exist")
        }// deleting
        else{
            await blogModel.findByIdAndUpdate(blogId,{$set:{isDeleted:true,deletedAt:new Date()}})
            res.status(200).send()
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const deleteByQuery = async function(req,res){
    try{
        // validate query params
        let condition = req.query
        if(Object.keys(condition).length==0) return res.status(400).send("Please provide atleast one query")
        // validate authorId
        if(condition.authorId){
            if (!mongoose.Types.ObjectId.isValid(condition.authorId))
            return res.status(400).send({ status: false, msg: "Invailid authorId" })
            if(condition.authorId!==req.authorId) return res.status(400).res("access denied")
        }
        // authorisation
        condition.authorId = req.authorId
        condition.isDeleted = false
        // deleting
        let deleted = await blogModel.updateMany(condition,{$set:{isDeleted:true,deletedAt:new Date()}})
        // fetching modifiedCount key from return object of above query
        let temp = deleted.modifiedCount.toString()
        // send error if deletion not complete i.e. if already deleted
        if(temp==0){
            return res.status(404).send({status: false,msg: "No such blog exists"})
        }// send number of deleted blog
        else{
            res.status(201).send({status: true,msg:`${temp} blogs deleted`})
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteById = deleteById
module.exports.deleteByQuery = deleteByQuery