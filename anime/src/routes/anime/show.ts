import express, { Request, Response } from "express";
import { Anime } from "../../models/anime";
import { NotFoundError } from "@devion/common";

const router = express.Router();

router.get("/api/animes/:id", async (req: Request, res: Response) => {
  const anime = await Anime.findOne({
    malId: req.params.id,
  });

  if (!anime) {
    throw new NotFoundError();
  }
  res.send(anime);
});

export { router as getAnimeRouter };
