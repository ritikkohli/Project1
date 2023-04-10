function isValidEmail(email) {
    // Regular expression to validate email address
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    // Password must be at least 8 characters long and contain at least one digit
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function isValidName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name)
}

function isValidTitle(title) {
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    return nameRegex.test(title)
}

function isValidPhone(phone) {
    const phoneRegex = /^[789]\d{9}$/;
    return phoneRegex.test(phone)
}

function isValidTags(tags){
    tags.map((tag)=>{
        if(!isValidName(tag)) return false
    })
    return true
}

module.exports = {isValidEmail,isValidName,isValidPassword,isValidPhone,isValidTags,isValidTitle}