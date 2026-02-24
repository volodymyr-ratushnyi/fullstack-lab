import {app} from "src/app.ts";
import request from "supertest";

describe('/course', () => {
  it('should return 200', async () => {
    await request(app)
      .get('/users')
      .expect(200, 'respond with a resource')
  })
})
