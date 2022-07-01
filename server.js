const http = require('http')
const colors = require('colors')
const morgan = require('morgan')
const products = require('./data/products')

const server = http.createServer((req, res) => {
    if(req.url === "/api/v1/products" && req.method === "GET"){
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({ message: '404, Route Not found!'}))
    }
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Server started running on http://localhost:4000`.yellow.inverse)
})