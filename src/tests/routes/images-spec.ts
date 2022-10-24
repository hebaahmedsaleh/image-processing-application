import request from "supertest";
import { app } from "../../index";

describe("check the server on running and going to images and resize it", (): void => {
  it("responds with 200 to go to the image from images folder", (done): void => {
    request(app)
      .get("/images?filename=img1.jpg&width=500&height=400")
      .expect(200, done);
  });

  //   it("responds with 200 to go to the image not exist in  images folder", async (done) => {
  //     const data = await request(app).get(
  //       "/images?filename=jsjsjsj.jpg&width=500&height=400"
  //     );

  //     expect(done);
  //   });
});
