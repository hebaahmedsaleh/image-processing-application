import express, { Router, Request, Response } from "express";
import previewPhoto from "../utilities/photo-helpers";

const router: Router = express.Router();

router.get("/images", async (reguest: Request, response: Response) => {
  try {
    previewPhoto(reguest, response);
  } catch (e) {
    response.status(500).send(e?.toString());
  }
});
export default router;
