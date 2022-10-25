import request, { Response } from 'supertest';
import { app } from '../index';

describe('check the server on running', () => {
  it('responds with 200 to go /home', async () => {
    request(app).get('/home').expect(200);

    const response: Response = await request(app).get('/home');
    expect(response.text).toBe('Express + TypeScript Server');
  });

  it('responds with 200 to go to the image from images folder', () => {
    request(app).get('/images?filename=img1.jpg').expect(200);
  });

  it('responds with 400 to go to the image not exist in  images folder', async () => {
    const response: Response = await request(app).get('/images?filename=test');
    expect(response.status).toBe(400);
    expect(response.text).toBe('This file not image.');
  });
});
