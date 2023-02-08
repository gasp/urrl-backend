import request from 'supertest'
import app from './app'

describe('app testing', () => {
  it('saves valid http urls', async () => {
    const url = 'https://www.google.com'
    const response = await request(app).post('/api/shorturl').send({ url })
    expect(response.status).toBe(200)
    expect(response.body.url).toEqual(url)
    expect(response.body.short).toBeDefined()
  })
  })
})
