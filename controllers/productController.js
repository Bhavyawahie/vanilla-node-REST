const Product = require("../models/productModel")


//getAllProducts

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}


//getProductById

const getProductById = async (req, res, id) => {
    try {
        const product = await Product.findById(id)
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

const addNewProduct = async (req, res) => {
    try {
        let body = ""
        req.on('data', (chunk) => {
            body = body + chunk.toString()
        })
        req.on('end', async () => {
            const {title, description, price} = Object.keys(body).length > 0 && JSON.parse(body)
            const product = {
                title: title || "Sample Title",
                description: description || "Sample Description",
                price: price || 100}
            const newProduct = await Product.create(product)
            res.writeHead(201, {"Content-Type": "application/json"})
            res.end(JSON.stringify(newProduct))
        })
    } catch (error) {
        console.log(error)
    }
}


//updateProduct


//deleteProduct



module.exports = {
    getAllProducts,
    getProductById, 
    addNewProduct
}