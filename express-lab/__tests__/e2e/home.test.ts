import app from "src/app.ts"
import request from "supertest"

describe('Home route test', () => {
  it('Home page snapshot', async () => {
    const {text: homePage} = await request(app)
      .get('/')
      .expect(200)
    expect(homePage).toMatchSnapshot()
  })

  it('Not found page snapshot', async () => {
    const {text: homePage} = await request(app)
      .get('/not-found')
      .expect(404)
    expect(homePage).toMatchSnapshot()
  })
})
