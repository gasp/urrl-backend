import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

import { isValidHttpUrl } from './lib/isValidUrl.js'
import { LinkService } from './services/linkService.js'
import { errorHandler, NotFoundError } from './errors.js'

const app: Express = express()

const Link = new LinkService()

app.get('/', (_req: Request, res: Response) => {
  res.send('Express Server')
})

app.get(
  '/l/:short(\\w+)',
  async (req: Request, res: Response, next: Function) => {
    try {
      const url = await Link.getUrlFromShort(req.params.short)
      if (!url) throw new NotFoundError('link not found')
      res.redirect(url)

      // this should be sent in a background job/queue
      await Link.updateClicks(req.params.short)
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
        const link = await Link.findByShort(short)
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

      const { short } = await Link.create(url)
      if (!short) throw new Error('failed to create link')
      res.json({ url, short })
    } catch (error) {
      next(error)
    }
  },
)

app.use(errorHandler)

export default app
