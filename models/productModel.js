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

const updateById = (id, updatedProduct) => {
    return new Promise((resolve, reject) => {
        const index = products.findIndex(p => p.id === id)
        products[index] = {id, ...updatedProduct}
        writeToFile('./data/products.json', products)
        resolve(products [index])
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        const updatedProducts = products.filter(p => p.id !== id)
        writeToFile('./data/products.json', updatedProducts)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create, 
    deleteById, 
    updateById
}