import request from 'supertest';
import { app } from '../../index';
import sizeOf from 'buffer-image-size';

describe('check the server on running and going to images and resize it', (): void => {
  it('check image width and height after resizing', async () => {
    const width = 400;
    const height = 500;
    const response = await request(app).get(
      `/images?filename=icelandwaterfall.jpeg&width=${width}&height=${height}`
    );

    const dimensions = sizeOf(response.body);

    expect(response.status).toBe(200);
    expect(dimensions.width).toEqual(width);
    expect(dimensions.height).toEqual(height);
  });
});
