import request from 'supertest'
import app from './app'

describe('app testing', () => {
  it('loads', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
