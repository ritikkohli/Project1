const authorModel = require("../models/authorModel.js")
const jwt = require("jsonwebtoken")

createAuthor = async function(req,res){
    try{
        let body = req.body
        let alphabets = /^[A-Z]+$/i
        let passValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        // validate data in body
        if(Object.keys(body).length===0) return res.status(400).send("You have not provided any data")
        // validate fname and insure that have only alphabets
        if(!body.fname) return res.status(400).send("Please provide fname")
        let test1 = alphabets.test(body.fname)
        if(!test1) return res.status(400).send("Enter alphabets only in fname")
        // validate lname and insure that  have only alphabets
        if(!body.lname) return res.status(400).send("Please provide lname")
        let test2 = alphabets.test(body.lname)
        if(!test2) return res.status(400).send("Enter alphabets only in lname")
        // validate title and insure has a only value from enum
        if(!body.title) return res.status(400).send("Please provide title")
        let test3 =  body.title.match(/Mr|Miss|Mrs/)
        if(!test3) return res.status(400).send("Title can have only Mr or Miss or Mrs")
        // validate email and its format
        if(!body.email) return res.status(400).send("Please provide email")
        let test4 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)
        if(!test4) return res.status(400).send("Enter valid email")
        let emailExist = await authorModel.find({email:body.email})
        if(emailExist) return res.status(400).send("Email already exist")
        // validate password and its format
        if(!body.password) return res.status(400).send("Please provide password")
        let test5 = passValid.test(body.password)
        if(!test5) return res.status(400).send("Enter valid password")
        // create document 
        let authorData = await authorModel.create(req.body)
        res.status(201).send(authorData)
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const logIn = async function(req,res){
    try{
        let password = req.body['password']
        let email = req.body['email']
        if(!password) return res.status(400).send("Enter password")
        if(!email) return res.status(400).send("Enter email")
        let user = await authorModel.findOne({email:email,password:password})
        if(!user){
            return res.status(404).send("Invailid mail or password")
        }else{
            let author = await authorModel.findOne({email:email})
            let token = await jwt.sign({authorId:author._id.toString()},"ritik-very-secret-key")
            res.status(200).send({status: true,data:{token:token}})
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

module.exports.createAuthor = createAuthor
module.exports.logIn = logIn