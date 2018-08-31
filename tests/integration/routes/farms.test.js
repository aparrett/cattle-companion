const request = require('supertest');
const { User } = require('../../../models/User');
const { Farm } = require('../../../models/Farm');
const { Cow, CowGenders } = require('../../../models/Cow');
const mongoose = require('mongoose');

let server;

describe('/api/farms', () => {
  beforeEach(() => server = require('../../../index'));
  afterEach(async () => await server.close());

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

    afterEach(async () => await Promise.all([Farm.deleteMany({}), User.deleteMany({})]));

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
    let user;
    let farm;
    let token;
    let farmId;
    let dateOfBirth;

    const doRequest = () => request(server)
      .post(`/api/farms/${farmId}/cattle`)
      .set('x-auth-token', token)
      .send({ name, gender, dateOfBirth });

    beforeEach(async () => {
      user = new User({ name: 'test', email: 'test1@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();

      farm = new Farm({ name: 'Test', users: [user._id]});
      farm = await farm.save();
      farmId = farm._id;

      name = 'cow';
      gender = CowGenders.Cow;
      dateOfBirth = new Date();
    });

    afterEach(async () => {
      await Promise.all([User.deleteMany({}), Farm.deleteMany({}), Cow.deleteMany({})]);
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 401 if farm does not belong to user', async () => {
      const user2Id = mongoose.Types.ObjectId(); 

      farm = new Farm({ name: 'foo', users: [user2Id]});
      farm = await farm.save();
      farmId = farm._id;

      const res = await doRequest();

      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      farmId = 1;
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 404 if farm doesnt exist', async () => {
      farmId = mongoose.Types.ObjectId();
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    describe('validate Cow', () => {
      it('should return 400 if name is not given', async () => {
        name = '';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if name is greater than 100 characters', async  () => {
        name = new Array(102).join('a');
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if gender is not given', async () => {
        gender = '';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if invalid gender', async () => {
        gender = 'foo';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if dateOfBirth is not given', async () => {
        dateOfBirth = '';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if dateOfBirth is not a date', async () => {
        dateOfBirth = 'foo';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });
    });

    it('should save the cow', async () => {
      const res = await doRequest();
      const cow = await Cow.findById(res.body._id);

      expect(cow).not.toBeNull();
    });

    it('should return the cow', async () => {
      const res = await doRequest();
      
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(name);
      expect(res.body.gender).toBe(CowGenders.Cow);
    });
  });

  describe('GET /:id', () => {
    afterEach(async () => {
      await Promise.all([User.deleteMany({}), Farm.deleteMany({}), Cow.deleteMany({})]);
    });

    it('should return 401 if not authorized', async () => {
      const farmId = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/farms/${farmId}`);

      expect(res.status).toBe(401);
    });

    it('should return 404 if invalid id', async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .get(`/api/farms/1`)
        .set('x-auth-token', token);

      expect(res.status).toBe(404);
    });

    it('should return 404 if farm not found', async () => {
      const token = new User().generateAuthToken();
      const farmId = mongoose.Types.ObjectId();
      const res = await request(server)
        .get(`/api/farms/${farmId}`)
        .set('x-auth-token', token);

      expect(res.status).toBe(404);
    });

    it('should return the farm with the given id', async () => {
      let user = new User({ name: 'test', email: 'foo@bar.com', password: 'password' });
      user = await user.save();

      let token = user.generateAuthToken();

      let farm = new Farm({ name: 'foo', users: [user._id]});
      farm = await farm.save();

      const res = await request(server)
        .get(`/api/farms/${farm._id}`)
        .set('x-auth-token', token);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('foo');
    });

    it('farm should contain its cattle if they exist', async () => {
      let user = new User({ name: 'test', email: 'foo@bar.com', password: 'password' });
      user = await user.save();

      let token = user.generateAuthToken();

      let farm = new Farm({ name: 'foo', users: [user._id]});
      farm = await farm.save();

      let cow = new Cow({ 
        name: 'cow', 
        gender: CowGenders.Cow, 
        dateOfBirth: '12/12/2012',
        farmId: farm._id
      });

      cow = await cow.save();

      const res = await request(server)
        .get(`/api/farms/${farm._id}`)
        .set('x-auth-token', token);

      expect(res.body.cattle.length).toBe(1);
      expect(res.body.cattle[0].name).toBe('cow');
    });
  });
});