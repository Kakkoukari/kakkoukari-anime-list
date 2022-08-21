import express, { Request, Response } from "express";
import { Anime } from "../models/animes";

const router = express.Router();

router.get("/api/anime", async (req: Request, res: Response) => {
  const animes = Anime.find();
  console.log(animes);
  res.send(animes);
});

export { router as showAllAnimeRouter };
