const products = require('../data/products') 

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

module.exports = {
    findAll,
    findById
}