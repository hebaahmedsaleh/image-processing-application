"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendFile = exports.sum = void 0;
const fs_1 = require("fs");
function sum(a, b) {
    return a + b;
}
exports.sum = sum;
console.log(sum(6, 6));
const appendFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const myFile = yield fs_1.promises.writeFile("heba.txt", "a+");
});
exports.appendFile = appendFile;
// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
// var fs = require("fs");
// dotenv.config();
// const app: Express = express();
// const port = process.env.PORT;
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });
// function getPhoto(req: express.Request, res: express.Response) {
//   fs.readFile("image.jpg", function (err: express.Errback, data: any) {
//     if (err) throw err;
//     res.writeHead(200, { "Content-Type": "image/jpeg" });
//     res.end(data); // Send the file data to the browser.
//   });
// }
// app.get("/get", function (req: express.Request, res: express.Response) {
//   return getPhoto(req, res);
//   // res.sendFile(getPhoto(req, res));
// });
// app.use(express.static("public"));
// app.use("/images", express.static("images"));
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });
