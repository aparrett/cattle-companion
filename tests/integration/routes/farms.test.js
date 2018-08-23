const request = require('supertest');
const { User } = require('../../../models/User');

let server;

describe('/api/farms', () => {
  beforeEach(async () => server = require('../../../index'));

  afterEach(async () => {
    await server.close();
  });

  describe('POST /', () => {
    let name;
    let token;

    const doRequest = () => {
      return request(server)
        .post('/api/farms')
        .set('x-auth-token', token)
        .send({ name });
    }

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'Farm1';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await doRequest();

      expect(res.status).toBe(401);
    });

    it('should return 400 if name is not given', async () => {
      name = '';
      
      const res = await doRequest();

      expect(res.status).toBe(400);
    });

    it('should return 400 if name is greater than 100 characters', async () => {
      name = new Array(102).join('a');

      const res = await doRequest();

      expect(res.status).toBe(400);
    });

    // it should save farm is it is valid
    // it should return farm if it is valid
  });
});