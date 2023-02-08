import dotenv from 'dotenv'
import { createClient, RedisClientType } from '@redis/client'
import { Link } from '../models/index.js'
import { shortUrlToInt, intToShortUrl } from '../lib/shortUrl.js'

// TODO: use centralized config
dotenv.config()

type LinkModel = typeof Link

export class LinkService {
  private linkModel: LinkModel
  private redisClient: RedisClientType

  constructor() {
    this.linkModel = Link
    this.redisClient = createClient({ url: process.env.REDIS_HOST })
  }

  async connect() {
    await this.redisClient.connect()
  }

  async findByPk(id: number) {
    return await this.linkModel.findByPk(id)
  }

  async findAll() {
    return await this.linkModel.findAll()
  }

  async create(url: string) {
    if (!this.redisClient.isReady) await this.connect()

    const created = await this.linkModel.create({ url })
    if (!created) throw new Error('failed to create link')
    const short = intToShortUrl(created.getDataValue('id'))
    this.redisClient.set(short, url)
    return { ...created.dataValues, short }
  }

  async findByShort(short: string) {
    const id = shortUrlToInt(short)
    const link = await this.findByPk(id)
    if (!link) return null
    return link
  }

  async getUrlFromShort(short: string): Promise<string | null> {
    if (!this.redisClient.isReady) await this.connect()
    const cachedUrl = await this.redisClient.get(short)
    if (cachedUrl) return cachedUrl
    const link = await this.findByShort(short)
    if (!link) return null
    return link.getDataValue('url')
  }

  async updateClicks(short: string) {
    const link = await this.findByShort(short)
    if (!link) return

    await this.linkModel.update(
      { clicks: link.clicks + 1 },
      {
        where: { id: link.id },
      },
    )
  }
}
