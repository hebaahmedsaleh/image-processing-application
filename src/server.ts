import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import fs from "fs";
import path from "path";

import previewPhoto from "./utilities/photo-helpers";
import images from "./routes/images";

dotenv.config();

export const app: Application = express();
app.use(morgan("dev"));

const port = process.env.PORT;

app.get("/home", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/", images);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
