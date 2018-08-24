const request = require('supertest');
const { User } = require('../../../models/User');
const mongoose = require('mongoose');

let server;

describe('/api/me', () => {
  beforeEach(() => server = require('../../../index'));
  
  afterEach(async () => {
    await server.close();
  });

  describe('GET /farms', () => {
    let user;
    let token;
    let id;

    const doRequest = () => {
      return request(server)
        .get(`/api/me/farms`)
        .set('x-auth-token', token);
    };

    beforeEach(async () => {
      user = new User({ name: 'test', email: 'test1@test.com', password: 'password' });
      user = await user.save();
      id = user._id;
      token = user.generateAuthToken();
    });

    afterEach(async () => {
      await User.deleteMany({});
    });

    it('should return 404 if given id is not a valid id', async () => {
      id = 1;

      const res = await doRequest();

      expect(res.status).toBe(404);
    });
    
    it('should return 404 if user not found with given id', async () => {
      id = mongoose.Types.ObjectId();

      const res = await doRequest();

      expect(res.status).toBe(404);
    });

    it('should return 401 if user not authorized', async () => {
      token = '';
      
      const res = await doRequest();

      expect(res.status).toBe(401);
    });

    // it should return farms for user if user is valid
  });
});