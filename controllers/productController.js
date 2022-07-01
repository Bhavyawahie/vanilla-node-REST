const Products = require("../models/productModel")


//getAllProducts

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}


//getProductById

const getProductById = async (req, res, id) => {
    try {
        const product = await Products.findById(id)
        if(!product) {
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: "Product not found!"}))
        } else {
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}


//addNewProduct


//updateProduct


//deleteProduct



module.exports = {
    getAllProducts,
    getProductById
}