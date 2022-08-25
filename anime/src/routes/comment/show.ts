import express, { Request, Response } from "express";
import { Comment } from "../../models/comment";

const router = express.Router();

router.get("/api/animes/comment", async (req: Request, res: Response) => {
  const comments = await Comment.find({
    animeId: req.body.animeId,
  });

  res.send(comments);
});

export { router as getAnimeRouter };
