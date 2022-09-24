import express, { Request, Response } from "express";
import { Comment } from "../../models/comment";

const router = express.Router();

router.post("/api/animes/comments", async (req: Request, res: Response) => {
  const comments = await Comment.find({
    animeId: req.body.animeId,
  });

  res.send(comments);
});

export { router as getCommentRouter };
