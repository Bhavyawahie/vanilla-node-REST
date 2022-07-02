let users = require('../data/users.json')
const { writeToFile } = require('../utils');
const {v4: uuidv4} = require("uuid")
const bcrypt = require('bcrypt')

//findById
const findById = (id) => {
    return new Promise((resolve, reject) => {
        resolve()
    })
}
//findByEmail
const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.email === email)
        resolve(user)
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



module.exports = {
    findById,
    findByEmail,
    create
}