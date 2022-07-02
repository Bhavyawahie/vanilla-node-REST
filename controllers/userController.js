const User = require('../models/userModel')
const { getPostData, generateToken } = require('../utils')
const bcrypt = require('bcrypt')

//addNewUser
const addNewUser = async (req, res) => {
    try {
        const body = await getPostData(req)
        const {name, email, password} = Object.keys(body).length > 0 && JSON.parse(body)
        let user = {
            name: name,
            email: email,
            password: password
        }
        const newUser = await User.create(user)
        newUser.token = await generateToken(newUser.id)
        res.writeHead(201, {"Content-Type":"application/json"})
        res.end(JSON.stringify({message: "User added Successfully!", "userInfo": newUser }))
    } catch (error) {
        console.log(error)
    }
    
}

//authenticateUser



module.exports = {
    addNewUser
}