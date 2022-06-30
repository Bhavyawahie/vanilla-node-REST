const http = require('http')
const colors = require('colors')
const morgan = require('morgan')
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>Hello beti logo!</h1>')
    res.end()

})
const PORT = process.env.PORT || 4000



server.listen(PORT, () => {
    console.log(`Server started running on http://localhost:4000`.yellow.inverse)
})