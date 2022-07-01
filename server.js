const http = require('http')
const colors = require('colors')
const products = require('./data/products')
const { getAllProducts, getProductById } = require('./controllers/productController')

const server = http.createServer((req, res) => {
    if(req.url === "/api/v1/products" && req.method === "GET"){
        getAllProducts(req, res)
    } else if (req.url.match(/\/api\/v1\/products\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[4]
        getProductById(req, res, id)
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