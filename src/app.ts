import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

import { intToShortUrl, shortUrlToInt } from './lib/shortUrl.js'
import { isValidHttpUrl } from './lib/isValidUrl.js'
import { Link } from './models/index.js'
import { errorHandler, NotFoundError } from './errors.js'

const app: Express = express()

app.get('/', (_req: Request, res: Response) => {
  res.send('Express Server')
})

app.get(
  '/l/:short(\\w+)',
  async (req: Request, res: Response, next: Function) => {
    try {
      const id = shortUrlToInt(req.params.short)
      // this should be fetched by redis
      const link = await Link.findByPk(id)
      if (!link) throw new NotFoundError('link not found')
      res.redirect(link.url)
      // this should be sent in a background job/queue
      await Link.update(
        { clicks: link.clicks + 1 },
        {
          where: { id },
        },
      )
    } catch (error) {
      next(error)
    }
  },
)

app.post(
  '/api/shorturl/analytics',
  bodyParser.json(),
  async (req: Request, res: Response, next: Function) => {
    const { short }: { short?: string } = req.body
    try {
      if (typeof short === 'string') {
        const id = shortUrlToInt(short)
        const link = await Link.findByPk(id)
        if (!link) throw new NotFoundError('short link not found')
        res.json({ ...link.dataValues, short })
      } else {
        const links = await Link.findAll()
        res.json(links)
      }
    } catch (error) {
      next(error)
    }
  },
)

app.post(
  '/api/shorturl',
  bodyParser.json(),
  async (req: Request, res: Response, next: Function) => {
    try {
      const { url } = req.body
      if (!url) throw new Error('url is required')
      if (typeof url !== 'string') throw new Error('url must be a string')
      if (!isValidHttpUrl(url)) throw new Error('url must be a valid http url')

      const { id } = await Link.create({ url })
      if (!id) throw new Error('failed to create link')
      res.json({ url, short: intToShortUrl(id) })
    } catch (error) {
      next(error)
    }
  },
)

app.use(errorHandler)

export default app
