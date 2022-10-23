import { promises as fsPromises } from "fs";

export function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(6, 6));

export const appendFile = async () => {
  const myFile = await fsPromises.writeFile("heba.txt", "a+");
};

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
