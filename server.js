const http = require('http')
const colors = require('colors')
const products = require('./data/products')
const { getAllProducts, getProductById, addNewProduct, deleteProduct, updateProduct } = require('./controllers/productController')
const { addNewUser } = require('./controllers/userController')

const server = http.createServer((req, res) => {
    if(req.url === "/api/v1/products" && req.method === "GET"){
        getAllProducts(req, res)
    } else if (req.url.match(/\/api\/v1\/products\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$)|([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[4]
        getProductById(req, res, id)
    } else if (req.url === "/api/v1/products" && req.method === "POST") {
        addNewProduct(req, res)
    } else if (req.url.match(/\/api\/v1\/products\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$)|([0-9]+)/) && req.method === "DELETE") {
        const id =  req.url.split('/')[4]
        deleteProduct(req, res, id)
    } else if (req.url.match(/\/api\/v1\/products\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$)|([0-9]+)/) && req.method === "PUT") {
        const id =  req.url.split('/')[4]
        updateProduct(req, res, id)
    }
    else if(req.url === "/api/v1/users/" && req.method === "POST") {
        addNewUser(req, res)
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: '404, Route Not found!'}))
    }

})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Server started running on http://localhost:4000`.yellow.inverse)
})