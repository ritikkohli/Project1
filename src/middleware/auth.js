const jwt = require("jsonwebtoken")

const authentication = async function (req, res, next) {
    try {
        if (!req.headers['x-api-key']) return res.status(400).send('Token is mandatory') //validating the header
        try {
            let decoded = jwt.verify(req.headers['x-api-key'], "ritik-very-secret-key") //veriying token
            req.authorId = decoded['authorId'] //store authorId from token and send in req parameter
            next()
        }
        catch (err) {
            res.status(400).send({ message: `${err.message} Please provide valid token` })
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.authentication = authentication