let products = require('../data/products') 
const { v4: uuidv4} = require('uuid')
const { writeToFile } = require('../utils')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
} 

const findById = (id) => {
    return new Promise((resolve, reject) => {
        resolve(products.find(p => p.id === id))
    })
}

const create = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct = {
            id: uuidv4(), 
            ...product
        }
        products.push(newProduct)
        writeToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

module.exports = {
    findAll,
    findById,
    create
}