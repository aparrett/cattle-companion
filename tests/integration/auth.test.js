const request = require('supertest');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt');

let server;

describe('/api/auth', () => {
  beforeEach(() => server = require('../../index'));

  afterEach(async () => {
    await server.close();
  });

  describe('POST /', () => {
    const name = 'tester';
    let email;
    let password;

    const doRequest = () => {
      return request(server)
        .post('/api/auth')
        .send({ email, password });
    }

    beforeEach(async () => {
      email = 'test@email.com';
      password = 'password';

      const user = new User({ name, email, password, });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
    });

    afterEach(async () => {
      await User.remove({});
    });

    it('should return 400 if user not found with given email', async () => {
      email = 'bademail@test.com';

      const res = await doRequest();

      expect(res.status).toBe(400);
    });

    // it should return 400 if password not correct

    // it should return token and 200 if email and password are correct
  });
});