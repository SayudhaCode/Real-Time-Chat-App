const http = require('http')
const querystring = require('querystring')

const port = process.env.PORT || 1337

function respondText(req, res) {
    res.setHeader('Content-Type', 'Text/Plain');
    res.end('Hi');
}

function respondJson(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({text: 'hi', numbers: [1, 2, 3]}));
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'Text/Plain'})
    res.end('Not Found')
}

function respondEcho(req, res) {
    const {input = ''} = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        normal: input,
        shout: input.toUpperCase(),
        characterCount: input.length,
        backwards: input.split('').reverse().join('')
    }))
}

const server = http.createServer(function (req, res) {
    if (req.url === '/') return respondText(req, res)
    if (req.url === '/json') return respondJson(req, res)
    if (req.url.match(/^\/echo/)) return respondEcho(req, res)

    respondNotFound(req, res)
})

server.listen(port)
console.log(`Server listening on port ${port}`)