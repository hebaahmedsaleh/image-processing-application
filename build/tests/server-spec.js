"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
describe("check the server on running", () => {
    it("responds with 200", (done) => {
        (0, supertest_1.default)(server_1.app).get("/home").expect(200, done);
    });
    it("responds with 200 to go to the image from images folder", (done) => {
        (0, supertest_1.default)(server_1.app).get("/images?filename=img1.jpg").expect(200, done);
    });
});
