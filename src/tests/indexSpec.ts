const request = require("supertest");
const { app, sum } = require("../index");

describe("check the server on running", () => {
  it("expect myFunc(5) to equal 25", () => {
    expect(sum(5, 4)).toEqual(9);
  });

  it("responds with 200 to go to the image from images folder", () => {
    request(app).get("/images?filename=img1.jpg").expect(200);
  });
});
