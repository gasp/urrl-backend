import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

import { Link } from './models/index.js'

const app: Express = express()

app.get('/', (_req: Request, res: Response) => {
  res.send('Express Server')
})

app.post(
  '/api/shorturl/analytics',
  bodyParser.json(),
  async (req: Request, res: Response, next: Function) => {
    const { short }: { short?: string } = req.body
    try {
      const link = await Link.findByPk(short)
      if (!link) throw new Error('short link not found')
      res.json(link)
    } catch (error) {
      next(error)
    }
  },
)
const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: Function,
) => {
  res.status(500)
  if (process.env.NODE_ENV === 'production') {
    res.json({ error: error.message })
  }
  res.json({ error: error.message, stack: error.stack })
}

app.use(errorHandler)

export default app
