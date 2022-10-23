import request from 'supertest';
import { app } from '../server';

describe('check the server on running', (): void => {
  it('responds with 200', (done): void => {
    request(app).get('/home').expect(200, done);
  });

  it('responds with 200 to go to the image from images folder', (done): void => {
    request(app).get('/images?filename=img1.jpg').expect(200, done);
  });
});
