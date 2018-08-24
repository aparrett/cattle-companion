const request = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../../../models/User');
const { Farm } = require('../../../models/Farm');

let server;

describe('/api/me', () => {
  beforeEach(() => server = require('../../../index'));
  
  afterEach(async () => {
    await server.close();
  });

  describe('GET /farms', () => {
    let user;
    let token;

    const doRequest = () => {
      return request(server)
        .get('/api/me/farms')
        .set('x-auth-token', token);
    };

    beforeEach(async () => {
      user = new User({ name: 'test', email: 'test1@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();
    });

    afterEach(async () => {
      await User.deleteMany({});
      await Farm.deleteMany({});
    });

    it('should return 401 if user not authorized', async () => {
      token = '';
      
      const res = await doRequest();

      expect(res.status).toBe(401);
    });

    it('should return farms for user if user is valid', async () => {
      let farm1 = new Farm({ name: 'Farm'});
      let farm2 = new Farm({ name: 'Farm2'});
      
      farm1.users.push(user._id);
      farm2.users.push(user._id);
     
      await Promise.all([farm1.save(), farm2.save()]);

      const res = await doRequest();

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(f => f.name === 'Farm')).toBeTruthy();
      expect(res.body.some(f => f.name === 'Farm2')).toBeTruthy();
    });
  });
});