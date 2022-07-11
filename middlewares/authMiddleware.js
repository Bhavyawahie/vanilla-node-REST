const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const protect = async (req, res) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[2]
            const decodedToken = jwt.verify(token, "secretKey")
            const user = await User.findById(decodedToken.id)
            const headerUserObject = {
                id: user.id,
                name: user.name,
                email: user.email,
            }
            req.user = headerUserObject
            return true
        } catch (error) {
            res.writeHead(401, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: "Not authorized, User not found!"}))
        }
    }
    if(!token){
        res.writeHead(401, {"Content-Type": "application/json"})
        res.end(JSON.stringify({message: "Not authorized, Token not found!"}))
    }

}

module.exports = {
    protect
}