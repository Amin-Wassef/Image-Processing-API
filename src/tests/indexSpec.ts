import supertest from 'supertest';
import app from '../index';
import { dirPath } from '../utiles/path';
import { existsSync } from 'fs';
import path from 'path';

const request = supertest(app);

describe('Test endpoint responses at http://localhost:8000', () => {
  beforeAll(() => {
    console.log('Response testing started');
  });
  beforeEach(() => {
    console.log('New test started');
  });
  afterEach(() => {
    console.log('This test has been accomplished, ready for new test if any');
  });
  afterAll(() => {
    console.log('All Resonse testing has be accomplished');
  });

  it('Test if main route is working', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is built successfully');
  });

  it('Test /api without query parameters', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(400);
    expect(response.text).toBe('400 Bad Request: ?name="file name" is required');
  });

  it('Test /api with query: name: invalid', async () => {
    const response = await request.get('/api').query({ name: 'invd' });
    expect(response.status).toBe(404);
    expect(response.text).toBe('404 Not Found: No image with this name');
  });

  it('Test /api with query: name: valid', async () => {
    const response = await request.get('/api').query({ name: 'fjord' });
    expect(response.status).toBe(200);
  });

  it('Test /api with query: name: valid, width / height: valid only', async () => {
    const response = await request.get('/api').query({ name: 'fjord', width: 2358 });
    expect(response.status).toBe(400);
    expect(response.text).toBe('400 Bad Request: Please assign both width and height');
  });

  it('Test /api with query: name: valid, width: valid and height: valid', async () => {
    const response = await request.get('/api').query({ name: 'fjord', width: 2358, height: 4896 });
    expect(response.status).toBe(200);
    expect(existsSync(path.join(dirPath, '../resized/fjord 2358 4896.jpg'))).toBeTrue;
  });

  it('Test /api with query: name: valid, width: valid and height: invalid', async () => {
    const response = await request.get('/api').query({ name: 'fjord', width: 2358, height: -4896 });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      '400 Bad Request: width and height should be a number greater than 0'
    );
  });

  it('Test /api with query: name: valid, width: invalid and height: valid', async () => {
    const response = await request.get('/api').query({ name: 'fjord', width: 'bjh', height: 4896 });
    expect(response.status).toBe(400);
    expect(response.text).toBe('400 Bad Request: Unknown error occurred with dimensions');
  });
});
