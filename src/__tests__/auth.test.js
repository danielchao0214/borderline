const request = require('supertest');
const app = require('../pages/api/auth'); // the path to your register endpoint
describe('Registration endpoint', () => {
    test('Registers a new user', async () => {
        const res = await request(app)
          .post('/api/auth')
          .send({
            username: 'newuser',
            password: 'password123',
          });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User created successfully');
      });      
});
