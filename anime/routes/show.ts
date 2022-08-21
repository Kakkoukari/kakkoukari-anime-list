import express, { Request, Response } from "express";
import { Anime } from "../models/animes";
import { NotFoundError } from "@devion/common";

const router = express.Router();

router.get("/api/anime/:id", async (req: Request, res: Response) => {
  const anime = await Anime.findById(req.params.id);

  if (!anime) {
    throw new NotFoundError();
  }
  res.send(anime);
});

export { router as getAnimeRouter };
