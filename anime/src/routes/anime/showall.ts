import express, { Request, Response } from "express";
import { Anime } from "../../models/anime";

const router = express.Router();

router.get("/api/anime", async (req: Request, res: Response) => {
  const anime = await Anime.find();
  console.log("anime");
  res.send(anime);
});

export { router as showAllAnimeRouter };
