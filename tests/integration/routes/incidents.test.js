const request = require('supertest');

let server;

describe('/api/incidents', () => {
  beforeEach(() => server = require('../../../index.js'));
  afterEach(async () => await server.close());

  describe('GET /', () => {
    it('should return the incidents', async () => {
      const res = await request(server).get('/api/incidents');
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].name).toBe('Assisted Delivery');
    });
  });
});