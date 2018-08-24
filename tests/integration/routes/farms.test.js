const request = require('supertest');
const { User } = require('../../../models/User');
const { Farm } = require('../../../models/Farm');

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

    afterEach(async () => {
      await Promise.all([Farm.deleteMany({}), User.deleteMany({})]);
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

    it('should save the farm', async () => {
      const res = await doRequest();

      const farm = await Farm.find({ _id: res.body._id });

      expect(farm).not.toBeNull();
    });

    it('should save the user on the farm', async () => {
      let user = new User({ name: 'test', email: 'test1@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();

      const res = await request(server)
          .post('/api/farms')
          .set('x-auth-token', token)
          .send({ name });

      const farm = await Farm
        .findOne({ _id: res.body._id })
        .populate('User');
        
      expect(farm.users.length).toBe(1);
    });

    it('should return the farm', async () => {
      const res = await doRequest();

      expect(res.body.name).toBe(name);
    });
  });

  describe('POST /:id/cattle', () => {
    let name;
    let token;
    let id;

    const doRequest = () => {
      return request(server)
        .post(`/api/farms/${id}/cattle`)
        .set('x-auth-header', token);
    };

    // it should return 401 if user not given

    // should return 401 if farm does not belong to user

    // should return 404 if farm not found

    // should return 400 if cow not valid

    // should return cow 

    // should save the cow

    // cow should be in farm's cattle
  });
});