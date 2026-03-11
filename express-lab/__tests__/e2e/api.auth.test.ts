import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from "src/app.ts"
import request from "supertest"

describe('The auth tests', () => {
  const agent = request.agent(app)

  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const user = {
    firstName: 'First',
    lastName: 'Last',
    userName: 'userName',
    email: 'email@email.com',
    password: '123456',
    confirmPassword: '123456'
  }

  const credentials = {
    emailOrUserName: user.userName,
    password: user.password
  }

  it('should not register user without first name', async () => {
    const res = await agent
      .post('/api/register')
      .send({...user, firstName: ''})
      .expect(500)
    expect(res.body.message).toBe('User validation failed: firstName: Path `firstName` is required.')
  });

  it('should not register user without last name', async () => {
    const res = await agent
      .post('/api/register')
      .send({...user, lastName: ''})
      .expect(500)
    expect(res.body.message).toBe('User validation failed: lastName: Path `lastName` is required.')
  });

  it('should not register user without username', async () => {
    const res = await agent
      .post('/api/register')
      .send({...user, userName: ''})
      .expect(500)
    expect(res.body.message).toBe('User validation failed: userName: Path `userName` is required.')
  });

  it('should not register user without email', async () => {
    const res = await agent
      .post('/api/register')
      .send({...user, email: ''})
      .expect(400)
    expect(res.body.message).toBe('Enter a valid email')
  });

  it('should not register user without password', async () => {
    const res = await agent
      .post('/api/register')
      .send({...user, password: ''})
      .expect(400)
    expect(res.body.message).toBe('Password must be at least 6 characters long')
  });

  it('should not register user with another confirmPassword', async () => {
    const res = await agent
      .post('/api/register')
      .send({...user, confirmPassword: '1234567'})
      .expect(400)
    expect(res.body.message).toBe('Password confirmation does not match password.')
  });

  it('should register user', async () => {
    await agent
      .post('/api/register')
      .send(user)
      .expect(201)
  })

  it('should not login user with invalid userName or email', async () => {
    const res = await agent
      .post('/api/login')
      .send({...credentials, emailOrUserName: 'invalid'})
      .expect(400)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('should not login user with invalid password', async () => {
    const res = await agent
      .post('/api/login')
      .send({...credentials, password: 'invalid'})
      .expect(400)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('should login user with user name', async () => {
    await agent
      .post('/api/login')
      .send(credentials)
      .expect(200)
  })

  it('should logout user', async () => {
    await agent
      .get('/api/logout')
      .expect(200)
  })

  it('should login user with email', async () => {
    await agent
      .post('/api/login')
      .send({...credentials, emailOrUserName: user.email})
      .expect(200)
  })
})
