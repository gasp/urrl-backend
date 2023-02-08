import http from 'http'
import dotenv from 'dotenv'

import app from './app.js'

dotenv.config()
const port = process.env.API_PORT

const httpServer = http.createServer(app)

await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
console.log(`⚡️[server]: Server running at https://localhost:${port}`)
