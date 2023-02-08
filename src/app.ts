import http from 'http'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

console.log('hello world')

const app: Express = express()

app.get('/', (_req: Request, res: Response) => {
  res.send('Express Server')
})

dotenv.config()
const port = process.env.API_PORT

const httpServer = http.createServer(app)

await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
console.log(`⚡️[server]: Server running at https://localhost:${port}`)
