const request = require('supertest');
const { User } = require('../../../models/User');
const { Farm } = require('../../../models/Farm');

let server;

describe('/api/me', () => {
  beforeEach(() => server = require('../../../index'));
  
  afterEach(async () => {
    await server.close();
  });

  describe('GET /', () => {
    it('should return 401 if not authorized', async () => {
      const res = await request(server).get('/api/me');

      expect(res.status).toBe(401);
    });

    it('should return 404 if user not found', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .get('/api/me')
        .set('x-auth-token', token);

      expect(res.status).toBe(404);
    });

    it('should return user if user exists', async () => {
      let user = new User({ name: 'test', email: 'test1@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();

      const res = await request(server)
        .get('/api/me')
        .set('x-auth-token', token);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('test');
      expect(res.body.email).toBe('test1@test.com');

      await User.deleteMany({});
    });
  });

  describe('GET /farms', () => {
    it('should return 401 if user not authorized', async () => {
      const res = await request(server).get('/api/me/farms');

      expect(res.status).toBe(401);
    });

    it('should return farms for user if user is valid', async () => {
      let user = new User({ name: 'test', email: 'test1@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();

      let farm1 = new Farm({ name: 'Farm'});
      let farm2 = new Farm({ name: 'Farm2'});
      
      farm1.users.push(user._id);
      farm2.users.push(user._id);
     
      await Promise.all([farm1.save(), farm2.save()]);

      const res = await request(server)
        .get('/api/me/farms')
        .set('x-auth-token', token);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(f => f.name === 'Farm')).toBeTruthy();
      expect(res.body.some(f => f.name === 'Farm2')).toBeTruthy();
      
      await Promise.all([User.deleteMany({}), Farm.deleteMany({})]);
    });
  });
});