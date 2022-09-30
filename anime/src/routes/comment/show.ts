import express, { Request, Response } from "express";
import { Comment } from "../../models/comment";

const router = express.Router();

router.post("/api/animes/comments", async (req: Request, res: Response) => {
  const comments = await Comment.find({
    malId: req.body.malId,
  });

  res.send(comments);
});

export { router as getCommentRouter };
