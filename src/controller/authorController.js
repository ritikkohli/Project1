const authorModel = require("../models/authorModel.js")
const jwt = require("jsonwebtoken")
const {validBody,validName,validAuthorTitle,validMail,validPassword} = require("../validator/validations.js")

createAuthor = async function(req,res){
    try{
        let data = req.body
        // ---------------- validations ---------------
        if(!validBody(data)) return res.status(400).send({status:false,message:"Request body is empty"})
        const {fname,lname,title,email,password} = data
        if(!validName(fname)) return res.status(400).send({status:false,message:"Please provide first name with valid format"})
        if(!validName(lname)) return res.status(400).send({status:false,message:"Please provide last name with valid format"})
        if(!validAuthorTitle(title)) return res.status(400).send({status:false,message:"Please provide a valid title i.e. Mr,Miss,Mrs"})
        if(!validMail(email)) return res.status(400).send({status:false,message:"Please provide email with valid format"})
        let emailExist = await authorModel.findOne({email:email})
        if(emailExist) return res.status(400).send({status:false,message:"This email is already exist"})
        if(!validPassword(password)) return res.status(400).send({status:false,message:"Please provide password with valid format"})
        // ---------------------------------------------
        let authorData = await authorModel.create(req.body)
        res.status(201).send({status:true,data:authorData})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const logIn = async function(req,res){
    try{
        let data = req.body
        // ---------------- validations ---------------
        if(!validBody(data)) return res.status(400).send({status:false,message:"Please provide password and email"})
        const {email,password} = data
        if(!validMail(email)) return res.status(400).send({status:false,message:"Please provide email with valid format"})
        if(!validPassword(password)) return res.status(400).send({status:false,message:"Please provide password with valid format"})
        let user = await authorModel.findOne({email:email,password:password})
        if(!user) return res.status(404).send({status:false,message:"Invalid mail or password"})
        // ---------------------------------------------
        let token = await jwt.sign({authorId:user._id.toString()},"ritik-very-secret-key",{expiresIn : '1h'})
        res.cookie('token',token)
        res.status(200).send({status: true,data:{token:token}})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const logout = async function(req,res){
    try{
        res.clearCookie('token',{path:'/'});
        res.status(200).json('logout successfully')
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

module.exports = {createAuthor,logIn,logout}