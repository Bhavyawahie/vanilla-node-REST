const fs = require('fs')
const jwt = require('jsonwebtoken')

const writeToFile = (fileName, content) => {
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf-8',(err) => {
        if(err){
            console.log(err)
        }
    })
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = ""
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', () =>{
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const generateToken = async (id) => {
    return jwt.sign({id}, "secretKey", {expiresIn: "30d"})
}

module.exports = {
    writeToFile,
    getPostData,
    generateToken
}