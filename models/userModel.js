let users = require('../data/users.json')
const { writeToFile } = require('../utils');
const {v4: uuidv4} = require("uuid")
const bcrypt = require('bcrypt')

//findById
const findById = (id) => {
    return new Promise((resolve, reject) => {
        resolve(users.find(user => user.id === id))
    })
}
//findByEmail
const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        resolve(users.find(u => u.email === email))
    })
}

//createUser
const create = (user) => {
    return new Promise(async (resolve, reject) => {
        const newUser = {
            id: uuidv4(),
            name: user.name,
            email: user.email,
            password: await bcrypt.hash(user.password, 10)
        }
        users.push(newUser)
        writeToFile('./data/users.json', users)
        resolve(newUser)
    })
}

const matchPassword = (userId, password) => {
    return new Promise(async (resolve, reject) => {
        const user = users.find(user => user.id === userId)
        if(bcrypt.compare(password, user.password)){
            resolve(true)
        } else {
            resolve(false)
        }
    })
}



module.exports = {
    findById,
    findByEmail,
    create,
    matchPassword
}