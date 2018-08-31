const request = require('supertest');
const mongoose = require('mongoose');
const { Cow, CowGenders } = require('../../../models/Cow');
const { User } = require('../../../models/User');
const { Incident } = require('../../../models/Incident');
const { Farm } = require('../../../models/Farm');

let server;

describe('/api/cattle', () => {
  beforeEach(() => server = require('../../../index.js'));

  afterEach(async () => await server.close());

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

  describe('PUT /:id', () => {
    let cowId;
    let user;
    let token;
    let farm;
    let cowUpdate;

    const doRequest = () => {
      return request(server)
        .put(`/api/cattle/${cowId}`)
        .set('x-auth-token', token)
        .send(cowUpdate);
    }

    beforeEach(async () => {
      user = new User({ name: 'user', email: 'user@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();

      farm = new Farm({ name: 'farm', users: [user] });
      farm = await farm.save();

      cow = new Cow({ name: 'cow', gender: CowGenders.Cow, dateOfBirth: new Date(), farmId: farm._id });
      cow = await cow.save();
      cowId = cow._id;

      cow.name = 'newName';
      cow.gender = CowGenders.Bull;
      cowUpdate = cow;
    });

    afterEach(async () => {
      await Promise.all([ User.deleteMany({}), Farm.deleteMany({}), Cow.deleteMany({}) ]);
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 401 if cow does not belong to users farm', async () => {
      token = new User().generateAuthToken();
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      cowId = 1;
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 404 if cow does not exist', async () => {
      cowId = mongoose.Types.ObjectId();
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return updated cow', async () => {
      const res = await doRequest();
      
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('newName');
      expect(res.body.gender).toBe(CowGenders.Bull);
    });
  });

  describe('PATCH /:id', () => {
    let cowId;
    let user;
    let token;
    let farm;
    let cowUpdate;

    const doRequest = () => {
      return request(server)
        .patch(`/api/cattle/${cowId}`)
        .set('x-auth-token', token)
        .send(cowUpdate);
    }

    beforeEach(async () => {
      user = new User({ name: 'user', email: 'user@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();

      farm = new Farm({ name: 'farm', users: [user] });
      farm = await farm.save();

      cow = new Cow({ name: 'cow', gender: CowGenders.Cow, dateOfBirth: new Date(), farmId: farm._id });
      cow = await cow.save();
      cowId = cow._id;

      const incident1 = await Incident.findOne({});
      const incident2 = await Incident.findOne({ name: { $ne: incident1.name }});

      cowUpdate = { 
        incidents: [          
          { name: incident1.name, random: 'random', date: new Date() }, 
          { name: incident2.name, random: 'random', date: new Date() }
        ] 
      };
    });

    afterEach(async () => {
      await Promise.all([ User.deleteMany({}), Farm.deleteMany({}), Cow.deleteMany({}) ]);
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 401 if cow does not belong to users farm', async () => {
      token = new User().generateAuthToken();
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      cowId = 1;
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 404 if cow does not exist', async () => {
      cowId = mongoose.Types.ObjectId();
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return updated cow with incidents', async () => {
      const res = await doRequest();
      
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('cow');
      expect(res.body.incidents[0].name).toBe(cowUpdate.incidents[0].name);
      expect(res.body.incidents[1].name).toBe(cowUpdate.incidents[1].name);
    });
  });

  describe('DELETE /:id', () => {
    let cowId;
    let token;
    
    beforeEach(async () => {
      let user = new User({ name: 'user', email: 'user@email.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();
      
      let farm = new Farm({ name: 'farm', users: [user] });
      farm = await farm.save();

      let cow = new Cow({ name: 'cow', gender: CowGenders.Cow, dateOfBirth: new Date(), farmId: farm._id });
      cow = await cow.save();
      cowId = cow._id;
    });

    afterEach(async () => await Promise.all([ User.deleteMany({}), Cow.deleteMany({}), Farm.deleteMany({}) ]));

    const doRequest = () => request(server)
      .delete(`/api/cattle/${cowId}`)
      .set('x-auth-token', token);

    it('should return 401 if user is not authorized', async () => {
      token = '';
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 401 if user does not have access to that cow', async () => {
      token = new User().generateAuthToken();
      const res = await doRequest();
      expect(res.status).toBe(401);
    });


    it('should return 404 if id is not a valid object id', async () => {
      cowId = 1;
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 404 if the cow does not exist', async () => {
      cowId = mongoose.Types.ObjectId();
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 204', async () => {
      const res = await doRequest();
      expect(res.status).toBe(204);
    });

    it('cow should not be in database', async () => {
      await doRequest();
      const cow = await Cow.findById(cowId);
      expect(cow).toBeFalsy();
    });
  });
});