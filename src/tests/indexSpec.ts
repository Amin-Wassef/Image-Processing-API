import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('check if main route is working', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200)
        // expect(response.body).toBe('Server is built successfully');
    }
)});
