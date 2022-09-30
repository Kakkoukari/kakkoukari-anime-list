import express, { Request, Response } from "express";
import { currentUser } from "@devion/common";
import { Comment } from "../models/Comment";
import { CommentCreatedPublisher } from "../events/publisher/comment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.post(
  "/api/comments/add",
  currentUser,
  async (req: Request, res: Response) => {
    const { content, animeId, malId } = req.body;
    console.log("Checking in add comment route", content);

    const addedComment = Comment.build({
      content: content,
      animeId: animeId,
      malId: malId,
      userId: req.currentUser!.id,
      username: req.currentUser!.username,
    });

    await addedComment.save();
    console.log(req.currentUser);

    new CommentCreatedPublisher(natsWrapper.client).publish({
      commentId: addedComment.id,
      content: content,
      animeId: animeId,
      malId: malId,
      userId: req.currentUser!.id,
      username: req.currentUser!.username,
    });

    console.log("The newly added comment is:\n", addedComment);

    res.status(201).send({ addedComment });
  }
);

export { router as AddCommentRouter };
