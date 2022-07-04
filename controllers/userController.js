const User = require('../models/userModel')
const { getPostData, generateToken } = require('../utils')

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

const authenticateUser = async (req, res) => {
    const body = await getPostData(req)
    const { email, password } = Object.keys(body).length > 0 && JSON.parse(body)
    const user =  await User.findByEmail(email)
    if(user){
        const doPasswordsMatch = await User.matchPassword(user.id, password)
        if(doPasswordsMatch){
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                token: await generateToken(user.id)
            }))
        } 
    } else {
        res.writeHead(401, {"Content-Type": "application/json"})
        res.end(JSON.stringify({message: "Wrong email or password"}))
    }
}


module.exports = {
    addNewUser,
    authenticateUser
}