import app from './common'

describe('GET /healthy', () => {
  test('Test app health', async () => {
    const response = await app.get('/healthy')

    expect(response.statusCode).toBe(200)
  })
})
