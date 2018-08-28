const request = require('supertest');
const mongoose = require('mongoose');
const { Cow, CowGenders } = require('../../../models/Cow');
const { User } = require('../../../models/User');

let server;

describe('/api/cattle', () => {
  beforeEach(() => server = require('../../../index.js'));

  afterEach(async () => {
    await server.close();
  });

  describe('GET /:id', () => {
    let token;
    let cowId;

    const doRequest = () => {
      return request(server)
        .get(`/api/cattle/${cowId}`)
        .set('x-auth-token', token);
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      cowId = mongoose.Types.ObjectId();
    });

    it('should return 401 if user is not authorized', async () => {
      token = '';
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      cowId = 1;
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 404 if cow not found', async () => {
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return the cow if it exits', async () => {
      let farmId = mongoose.Types.ObjectId();
      let cow = new Cow({ 
        name: 'foo', 
        gender: CowGenders.Cow, 
        dateOfBirth: new Date(),
        farmId
      });

      cow = await cow.save();
      cowId = cow._id;

      const res = await doRequest();

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('foo');
      expect(res.body.gender).toBe(CowGenders.Cow);

      await Cow.deleteMany({});
    });
  });
});