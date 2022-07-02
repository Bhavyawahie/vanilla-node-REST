const Product = require("../models/productModel")
const { getPostData } = require("../utils")


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
        const body = await getPostData(req)
        const {title, description, price} = Object.keys(body).length > 0 && JSON.parse(body)
            const product = {
                title: title || "Sample Title",
                description: description || "Sample Description",
                price: price || 100}
            const newProduct = await Product.create(product)
            res.writeHead(201, {"Content-Type": "application/json"})
            res.end(JSON.stringify(newProduct))
    } catch (error) {
        console.log(error)
    }
}


//updateProduct

const updateProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: "Product Not Found!"}))
        } else {
            const body = await getPostData(req)
            const { title, description, price } = body
            const newProduct = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updatedProduct = await Product.updateById(id, newProduct)
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({ message: "Product Updated Successfully", product: updatedProduct }))

        }
    } catch (error) {
        console.log(error)
    }
}

//deleteProduct

const deleteProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: "Product Not Found!"}))
        } else {
            await Product.deleteById(id)
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: "Product Deleted"}))

        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllProducts,
    getProductById, 
    addNewProduct, 
    deleteProduct, 
    updateProduct
}