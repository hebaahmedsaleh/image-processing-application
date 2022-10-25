import request from 'supertest';
import { app } from '../../index';

describe('check the server on running and going to images and resize it', (): void => {
  it('responds with 200 to go to the image not exist in  images folder', async () => {
    const response = await request(app).get(
      '/images?filename=icelandwaterfall.jpeg&width=400&height=500'
    );
    expect(response.status).toEqual(200);
  });
});
