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

  it('increments links when clicked', async () => {
    const url = 'https://www.yahoo.com'
    const addAction = await request(app).post('/api/shorturl').send({ url })
    const { short } = addAction.body
    expect(short).toBeDefined()

    // click twice
    await request(app).get(`/l/${addAction.body.short}`)
    await request(app).get(`/l/${addAction.body.short}`)

    // wait for sql database to update
    new Promise(r => setTimeout(r, 200))

    const analyticsAction = await request(app)
      .post('/api/shorturl/analytics')
      .send({ short })

    expect(analyticsAction.body.clicks).toBe(2)
  })
})
