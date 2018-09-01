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

    const doRequest = () => request(server)
      .get(`/api/cattle/${cowId}`)
      .set('x-auth-token', token);

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
    let farmId;
    let gender;
    let name;
    let mother;
    let father;

    const doRequest = () => request(server)
      .put(`/api/cattle/${cowId}`)
      .set('x-auth-token', token)
      .send({ name, gender, dateOfBirth, mother: mother._id, father: father._id });

    beforeEach(async () => {
      user = new User({ name: 'user', email: 'user@test.com', password: 'password' });
      user = await user.save();
      token = user.generateAuthToken();

      farm = new Farm({ name: 'farm', users: [user] });
      farm = await farm.save();
      farmId = farm._id;

      cow = new Cow({ name: 'cow', gender: CowGenders.Cow, dateOfBirth: new Date('08/01/2018'), farmId });
      cow = await cow.save();
      cowId = cow._id;

      name = 'newName';
      gender = CowGenders.Bull;
      dateOfBirth = new Date('08/01/2018');

      mother = new Cow({ name: 'mother', gender: CowGenders.Cow, dateOfBirth: new Date('07/31/2018'), farmId });
      father = new Cow({ name: 'father', gender: CowGenders.Bull, dateOfBirth: new Date('07/31/2018'), farmId });

      [mother, father] = await Promise.all([ mother.save(), father.save() ]);
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

      it('should return 400 if selected father belongs to another farm', async () => {
        const otherFarmId = mongoose.Types.ObjectId();
        father = new Cow({ 
          name: 'father', 
          gender: CowGenders.Bull, 
          dateOfBirth: new Date('07/31/2018'), 
          farmId: otherFarmId 
        });

        father = await father.save();

        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if selected father is a (female) cow', async () => {
        father = new Cow({ 
          name: 'father', 
          gender: CowGenders.Cow, 
          dateOfBirth: new Date('07/31/2018'), 
          farmId 
        });

        father = await father.save();

        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if selected father is younger than the given cow', async () => {
        father = new Cow({ 
          name: 'father', 
          gender: CowGenders.Bull, 
          dateOfBirth: new Date('08/02/2018'), 
          farmId 
        });

        father = await father.save();

        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if selected mother belongs to another farm', async () => {
        const otherFarmId = mongoose.Types.ObjectId();
        mother = new Cow({ 
          name: 'mother', 
          gender: CowGenders.Cow, 
          dateOfBirth: new Date('07/31/2018'), 
          farmId: otherFarmId 
        });

        mother = await mother.save();

        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if selected mother is a bull', async () => {
        mother = new Cow({ 
          name: 'mother', 
          gender: CowGenders.Bull, 
          dateOfBirth: new Date('07/31/2018'), 
          farmId 
        });

        mother = await mother.save();

        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if selected mother is younger than the given cow', async () => {
        mother = new Cow({ 
          name: 'mother', 
          gender: CowGenders.Cow, 
          dateOfBirth: new Date('08/02/2018'), 
          farmId 
        });

        mother = await mother.save();

        const res = await doRequest();
        expect(res.status).toBe(400);
      });
    });

    it('should return updated cow 2', async () => {
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

    const doRequest = () => request(server)
      .patch(`/api/cattle/${cowId}`)
      .set('x-auth-token', token)
      .send(cowUpdate);

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

  describe('GET /:id/eligible-mothers', () => {
    let token;
    let cowId;

    beforeEach(async () => {
      token = new User().generateAuthToken();
      
      let farm = new Farm({ name: 'farm' });
      farm = await farm.save();
      farmId = farm._id;

      let cow = new Cow({ name: 'cow', gender: CowGenders.Cow, dateOfBirth: new Date('08/15/2018'), farmId });
      cow = await cow.save();
      cowId = cow._id;
    });

    afterEach(async () => await Promise.all([ Cow.deleteMany({}), Farm.deleteMany({}) ]));

    const doRequest = () => request(server)
      .get(`/api/cattle/${cowId}/eligible-mothers`)
      .set('x-auth-token', token);
    
    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      cowId = 1;
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 404 if cow with id does not exist', async () => {
      cowId = mongoose.Types.ObjectId();
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should not return younger cattle', async () => {
      const cow2 = new Cow({ name: 'cow2', gender: CowGenders.Cow, dateOfBirth: new Date('08/16/2018'), farmId });
      await cow2.save();
      
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should not return bulls', async () => {
      const cow2 = new Cow({ name: 'cow2', gender: CowGenders.Bull, dateOfBirth: new Date('08/14/2018'), farmId });
      await cow2.save();
      
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should not return itself (cow with given id)', async () => {
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should not return a cow from a different farm', async () => {
      let farm2 = new Farm({ name: 'farm2' });
      farm2 = await farm2.save();

      const cow2 = new Cow({ name: 'cow2', gender: CowGenders.Cow, dateOfBirth: new Date('08/14/2018'), farmId: farm2._id });
      await cow2.save();
      
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should return older (female) cows from the same farm', async () => {
      const cow2 = new Cow({ name: 'cow2', gender: CowGenders.Cow, dateOfBirth: new Date('08/14/2018'), farmId });
      await cow2.save();

      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('cow2');
    });
  });

  describe('GET /:id/eligible-fathers', () => {
    let token;
    let cowId;

    beforeEach(async () => {
      token = new User().generateAuthToken();
      
      let farm = new Farm({ name: 'farm' });
      farm = await farm.save();
      farmId = farm._id;

      let cow = new Cow({ name: 'bull', gender: CowGenders.Bull, dateOfBirth: new Date('08/15/2018'), farmId });
      cow = await cow.save();
      cowId = cow._id;
    });

    afterEach(async () => await Promise.all([ Cow.deleteMany({}), Farm.deleteMany({}) ]));

    const doRequest = () => request(server)
      .get(`/api/cattle/${cowId}/eligible-fathers`)
      .set('x-auth-token', token);
    
    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await doRequest();
      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      cowId = 1;
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should return 404 if cow with id does not exist', async () => {
      cowId = mongoose.Types.ObjectId();
      const res = await doRequest();
      expect(res.status).toBe(404);
    });

    it('should not return younger cattle', async () => {
      const cow2 = new Cow({ name: 'bull2', gender: CowGenders.Bull, dateOfBirth: new Date('08/16/2018'), farmId });
      await cow2.save();
      
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should not return (female) cows', async () => {
      const cow2 = new Cow({ name: 'cow2', gender: CowGenders.Cow, dateOfBirth: new Date('08/14/2018'), farmId });
      await cow2.save();
      
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should not return itself (cow with given id)', async () => {
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should not return a bull from a different farm', async () => {
      let farm2 = new Farm({ name: 'farm2' });
      farm2 = await farm2.save();

      const bull2 = new Cow({ name: 'bull2', gender: CowGenders.Bull, dateOfBirth: new Date('08/14/2018'), farmId: farm2._id });
      await bull2.save();
      
      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });

    it('should return older bulls from the same farm', async () => {
      const bull2 = new Cow({ name: 'bull2', gender: CowGenders.Bull, dateOfBirth: new Date('08/14/2018'), farmId });
      await bull2.save();

      const res = await doRequest();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('bull2');
    });
  });
});