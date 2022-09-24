import express, { Request, Response } from "express";
import { currentUser } from "@devion/common";
import { Comment } from "../models/Comment";
const router = express.Router();

router.get("/api/comments/show", async (req: Request, res: Response) => {
  const comments = await Comment.find({});
  console.log("Getting All comments, ", comments);
  res.status(200).send(comments);
});

export { router as GetAllCommentRouter };
