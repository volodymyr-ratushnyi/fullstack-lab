import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from "src/app.ts"
import request from "supertest"
import { sign } from 'cookie-signature'

describe('The auth tests', () => {
  const agent = request.agent(app)

  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }, 30000);

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

  const auth = {
    register: (data: typeof user) => agent.post('/api/auth/register').send(data),
    login: (data: typeof credentials) => agent.post('/api/auth/login').send(data),
    logout: () => agent.get('/api/auth/logout')
  }

  const users = {
    all: () => agent.get('/api/users'),
    profile: () => agent.get('/api/users/profile'),
    invalidProfile: () => request(app).get('/api/users/profile')
  }

  it('Should not register user without first name', async () => {
    const res = await auth.register({...user, firstName: ''}).expect(500)
    expect(res.body.message).toBe('User validation failed: firstName: Path `firstName` is required.')
  });

  it('Should not register user without last name', async () => {
    const res = await auth.register({...user, lastName: ''}).expect(500)
    expect(res.body.message).toBe('User validation failed: lastName: Path `lastName` is required.')
  });

  it('Should not register user without username', async () => {
    const res = await auth.register({...user, userName: ''}).expect(500)
    expect(res.body.message).toBe('User validation failed: userName: Path `userName` is required.')
  });

  it('Should not register user without email', async () => {
    const res = await auth.register({...user, email: ''}).expect(400)
    expect(res.body.message).toBe('Enter a valid email')
  });

  it('Should not register user without password', async () => {
    const res = await auth.register({...user, password: ''}).expect(400)
    expect(res.body.message).toBe('Password must be at least 6 characters long')
  });

  it('Should not register user with another confirmPassword', async () => {
    const res = await auth.register({...user, confirmPassword: '1234567'}).expect(400)
    expect(res.body.message).toBe('Password confirmation does not match password.')
  });

  it('Should register user', async () => {
    await auth.register(user).expect(201)
  })

  it('Should not login user with invalid userName or email', async () => {
    const res = await auth.login({...credentials, emailOrUserName: 'invalid'}).expect(400)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('Should not login user with invalid password', async () => {
    const res = await auth.login({...credentials, password: 'invalid'}).expect(400)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('Should login user with user name', async () => {
    const res = await auth.login(credentials).expect(200)
    expect(res.body.message).toBe('Logged in successfully')
  })

  it('Exist user after register', async () => {
    const res = await users.all().expect(200)
    expect(res.body[0].userName).toBe('userName')
  })

  it('Should logout user', async () => {
    const res = await auth.logout().expect(200)
    expect(res.body.message).toBe('Logged out successfully')
  })

  it('Should login user with email', async () => {
    await auth.login({...credentials, emailOrUserName: user.email}).expect(200)
  })

  it('Profile after login', async () => {
    const res = await users.profile().expect(200)
    expect(res.body.userName).toBe('userName')
  })

  it('Profile without token', async () => {
    const signedCookie = 's:' + sign('invalid-jwt', process.env.COOKIES_SECRET as string)
    const res = await users.invalidProfile()
      .set('Cookie', `token=${signedCookie}`)
      .expect(400)
    expect(res.body.message).toBe('Invalid token')
  })
})
