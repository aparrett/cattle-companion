const request = require('supertest');
const { User } = require('../../../models/User');

let server;

describe('/api/users', () => {
  beforeEach(() => server = require('../../../index'));
  afterEach(async () => await server.close());

  describe('POST /', () => {
    let name;
    let email;
    let password;

    const doRequest = () => {
      return request(server)
        .post('/api/users')
        .send({ name, email, password });
    };

    beforeEach(() => {
      name = 'person'
      email = 'test@email.com',
      password = 'TESTpassword1!'
    });

    afterEach(async () => await User.deleteMany({}));

    describe('Validate Name', () => {
      it('should return 400 if name is less than 3 characters', async () => {
        name = 'ab';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if name is greater than 100 characters', async () => {
        name = new Array(102).join('a');
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if name is not given', async () => {
        name = null;
        const res = await doRequest();
        expect(res.status).toBe(400);
      });
    });

    describe('Validate Email', () => {
      it('should return 400 if email is less than 5 characters', async () => {
        email = 'abca';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if email is greater than 255 characters', async () => {
        email = new Array(257).join('a');
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if email is not given', async () => {
        email = null;
        const res = await doRequest();
        expect(res.status).toBe(400);
      });
    });

    describe('Validate Password', () => {
      it('should return 400 if password is less than 5 characters', async () => {
        password = 'abca';
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if password is greater than 255 characters', async () => {
        password = new Array(257).join('a');
        const res = await doRequest();
        expect(res.status).toBe(400);
      });

      it('should return 400 if password is not given', async () => {
        password = null;
        const res = await doRequest();
        expect(res.status).toBe(400);
      });
    });

    it('should return 400 if user already registered', async () => {
      const user = new User({ name, email, password });
      await user.save();
      const res = await doRequest();
      expect(res.status).toBe(400);
    });

    it('should save user if user is valid', async () => {
      await doRequest();
      const user = await User.findOne({ email: 'test@email.com' });
      expect(user).not.toBeNull();
    });

    it('should send user in response if user is valid', async () => {
      const res = await doRequest();
      expect(res.body.user).toHaveProperty('_id');
      expect(res.body.user.name).toBe(name);
      expect(res.body.user.email).toBe(email);
    });

    it('should set header x-auth-token to jwt if user is valid', async () => {
      const res = await doRequest();
      expect(res.body).toHaveProperty('token');
    });
  });
});