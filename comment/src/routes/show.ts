import express, { Request, Response } from "express";
import { currentUser } from "@devion/common";
import { Comment } from "../models/Comment";
const router = express.Router();

router.get("/api/comments/show/:malId", async (req: Request, res: Response) => {
  const comments = await Comment.find({
    malId: req.query.malId,
  });
  console.log(`Getting comments for malId ${req.query.malId} `, comments);

  res.status(200).send(comments);
});

export { router as GetCommentRouter };
