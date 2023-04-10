const mongoose = require("mongoose")

function validBody(body){
    return Object.keys(body).length > 0
}
function validName(name){
    if(!name) return false
    if(typeof name !== 'string' || name.length == 0) return false
    return /^[a-zA-Z ]{3,20}$/.test(name.trim())
}

function validAuthorTitle(title){
    if(!title) return false
    if(typeof title !== 'string' || title.length == 0) return false
    return title.match(/Mr|Miss|Mrs/)
}

function validMail(email){
    if(!email) return false
    if(typeof email !== 'string' || email.length == 0) return false
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

function validPassword(password){
    if(!password) return false
    if(typeof password !== 'string' || password.length == 0) return false
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)
}

function validBlogBody(body){
    if(!body) return false
    if(typeof body !== 'string' || body.length == 0) return false
    // return /^[a-zA-Z. ]+$/.test(body)
}

function validId(id){
    if(!id) return false
    return mongoose.Types.ObjectId.isValid(id)
}

function validBoolean(value){
    return /true|false/.match(value)
}

function validArrayOfString(array){
    // if(typeof array == 'string') array = array.split(',')
    for(let i=0;i<array.length;i++){
        if(typeof array[i] !== 'string' || array[i].length == 0) return false
    }
    return true
}

module.exports = {validBody,validName,validAuthorTitle,validMail,validPassword,validBlogBody,
                  validId,validBoolean,validArrayOfString}