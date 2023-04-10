const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const {validBody,validBlogBody,validName,validId,validBoolean,validArrayOfString} = require("../validator/validations")

const createBlog = async function (req, res) {
    try {
        let data = req.body
        // ---------------- validations ---------------
        if(!validBody(data)) return res.status(400).send({status:false,message:"Request body is empty"})
        let {title,body,tags,category,subcategory,isPublished} = data
        data.authorId = req.authorId;
        if(!validName(title)) return res.status(400).send({status:false,message:"Please provide title with valid format"})
        // if(!validBlogBody(body)) return res.status(400).send({status:false,message:"Please provide body with valid format"})
        // if(!validId(authorId)) return res.status(400).send({status:false,message:"Please provide authorId with valid format"})
        // let author = await authorModel.findById(authorId)
        // if (!author) return res.status(400).send({status:false,message:"No author exist with this authorId"})
        if(tags.length){
            if(!validArrayOfString(tags)) return res.status(400).send({status:false,message:"Please provide tags with valid format"})
        }
        if(!category) return res.status(400).send({status:false,message:"Please provide category with valid format"})
        if(subcategory.length){
            if(!validArrayOfString(subcategory)) return res.status(400).send({status:false,message:"Please provide subcategory with valid format"})
        }
        // ---------------------------------------------
        let blogCreated = await blogModel.create(data)
        return res.status(201).send({status:true,data:blogCreated})
    }
    catch (err) {
        res.status(500).send({status:false,message:err.message})
    }
}

const getBlogs = async function (req, res) {
    try {
        let condition = {isDeleted:false}
        let data = req.query
        let {tags,category,subcategory}  = data
        // ---------------- validations ---------------
        if(tags){
            if(!validArrayOfString(tags)) return res.status(400).send({status:false,message:"Please provide tags with valid format"})
            tags = tags.split(',')            
            condition.tags = {$all:tags}
        }
        if(category){
            if(!validArrayOfString(category)) return res.status(400).send({status:false,message:"Please provide category with valid format"})
            category = category.split(',')
            condition.category = {$all : category}
        }
        if(subcategory){
            if(!validArrayOfString(subcategory)) return res.status(400).send({status:false,message:"Please provide subcategory with valid format"})
            subcategory = subcategory.split(',')
            condition.subcategory = {$all : subcategory}
        }
        // ---------------------------------------------
        let blogs = await blogModel.find(condition)
        if(blogs.length == 0) return res.status(400).send({status:false,message:"No blog found"})
        res.status(201).send({status:true,blogs:blogs})
    }
    catch (err) {
        res.status(500).send({status:false,message:err.message})
    }
}

const getById = async function(req,res){
    try{
        let blogId = req.params.blogId
        if(!validId(blogId)) return res.status(400).send({status:false,message:"Please provide authorId with valid format"})
        let blog = await blogModel.findOne({ _id: blogId , isDeleted: false })
        if (!blog) return res.status(404).send({ status: false, msg: "No blog exist with this bolgId"})
        let author = await authorModel.findById(blog.authorId)
        // console.log(author)
        res.status(200).send({status:true,blog:blog,author:author})
    }
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}

const getMyBlogs = async function(req,res){
    try{
        let authorId = req.authorId
        let blogs = await blogModel.find({isDeleted: false , authorId : authorId})
        if (!blogs) return res.status(404).send({ status: false, msg: "No blog exist with this bolgId"})
        let author = await authorModel.findById(blogs[0].authorId)
        // console.log(author)
        res.status(200).send({status:true,blogs:blogs,author:author})
    }
    catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}

const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let data = req.body
        // ---------------- validations ---------------
        if(!validId(blogId)) return res.status(400).send({status:false,message:"Please provide authorId with valid format"})
        let blog = await blogModel.findOne({ _id: blogId , isDeleted: false })
        if (!blog) return res.status(404).send({ status: false, msg: "No blog exist with this bolgId"})
        // ---------------- authorisation --------------
        let authorId = blog.authorId.toString()
        if(req.authorId !== authorId) return res.status(400).send("Access Denied")
        // ---------------------------------------------
        if(!validBody(data)) return res.status(400).send({status:false,message:"Provide something to update"})
        let {title,body,tags,category} = data
        let update = {isPublished:true,publishedAt:Date.now()}
        if(title){
            // if(!validName(title)) return res.status(400).send({status:false,message:"Please provide title with valid format"})
            update.title = title            
        }
        if(body){
            // if(!validBlogBody(body)) return res.status(400).send({status:false,message:"Please provide body with valid format"})
            update.body = body
        }
        if(tags.length){
            if(!validArrayOfString(tags)) return res.status(400).send({status:false,message:"Please provide tags with valid format"})
            update.tags = tags
        }
        if(category){
            update.category = category
        }
        //  return res.status(400).send({status:false,message:"Please provide category with valid format"})
        // ---------------------------------------------
        let updatedBlog = await blogModel.findByIdAndUpdate(blogId,{$set:update},{new:true})
        res.status(201).send({status:true,data:updatedBlog})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const deleteById = async function (req, res) {
    try{
        let blogId = req.params.blogId
        // ---------------- validations ---------------
        if(!validId(blogId)) return res.status(400).send({status:false,message:"Invalid blogId"})
        let blog = await blogModel.findOne({ _id: blogId , isDeleted: false })
        if (!blog) return res.status(404).send({ status: false, msg: "No blog exist with this bolgId"})
        // ---------------- authorisation --------------
        let authorId = blog.authorId.toString()
        if(req.authorId !== authorId) return res.status(400).send({status:false,msg:"Access denied"})
        // ---------------------------------------------
        await blogModel.findByIdAndUpdate(blogId,{$set:{isDeleted:true,deletedAt:new Date()}})
        res.status(200).send({status:true,message:'deleted successfully'})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const deleteByQuery = async function(req,res){
    try{
        let data = req.query
        // ---------------- validations ---------------
        if(!validBody(data)) return res.status(400).send({status:false,message:"Provide at least one query"})
        let {authorId,tags,subcategory,category} = data
        condition = {isDeleted:false,authorId:req.authorId}
        if(authorId){
            if(!validId(authorId)) res.status(400).send({status:false,message:"Invalid authorId"})
            if(authorId !== req.authorId) return res.status(400).res("access denied")
            condition.authorId = authorId
        }
        if(tags){
            if(!validArrayOfString(tags)) return res.status(400).send({status:false,message:"Please provide tags with valid format"})
            tags = tags.split(',')            
            condition.tags = {$all:tags}
        }
        if(category){
            if(!validArrayOfString(category)) return res.status(400).send({status:false,message:"Please provide category with valid format"})
            category = category.split(',')
            condition.category = {$all : category}
        }
        if(subcategory){
            if(!validArrayOfString(subcategory)) return res.status(400).send({status:false,message:"Please provide subcategory with valid format"})
            subcategory = subcategory.split(',')
            condition.subcategory = {$all : subcategory}
        }
        // ---------------------------------------------
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
        res.status(500).send({status:false,message:err.message})
    }
}

module.exports = { createBlog,getBlogs,updateBlog,deleteById,deleteByQuery,getById,getMyBlogs }