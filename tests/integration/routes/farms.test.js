const request = require('supertest');
const { User } = require('../../../models/User');
const { UserFarm } = require('../../../models/UserFarm');
const { Farm } = require('../../../models/Farm');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

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

    it('should save farm if it is valid', async () => {
      const res = await doRequest();

      const farm = await Farm.find({ _id: res.body._id });

      expect(farm).not.toBeNull();
    });

    it('should save farm and user farm if it is valid', async () => {
      const res = await doRequest();

      const user = jwt.verify(token, config.jwtPrivateKey);
      const userFarm = await UserFarm.find({ farm: res.body._id, user: user._id });

      expect(userFarm).not.toBeNull();
    });

    it('should return the farm if it is valid', async () => {
      const res = await doRequest();

      expect(res.body.name).toBe(name);
    });
  });
});