const request = require('supertest');
const seedIncidents = require('../../../db/seeds/seedIncidents');

let server;

describe('/api/incidents', () => {
  beforeEach(() => server = require('../../../index.js'));
  afterEach(async () => await server.close());

  describe('GET /', () => {
    it('should return the incidents', async () => {
      await seedIncidents();

      const res = await request(server).get('/api/incidents');
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});