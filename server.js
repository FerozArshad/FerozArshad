// Force Node.js libuv thread pool to 4 to prevent process explosion on Hostinger Passenger
process.env.UV_THREADPOOL_SIZE = "4";

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// Hostinger / Phusion Passenger Configuration
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

// Initialize Next.js in custom server mode (significantly lighter than Next CLI)
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    // Passenger intercepts the 'listen' call to map traffic automatically
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true)
            await handle(req, res, parsedUrl)
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('Internal Server Error')
        }
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port} - Custom Server`)
    })
})
