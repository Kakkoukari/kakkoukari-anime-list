import express, { Request, Response } from "express";
import { currentUser, NotFoundError } from "@devion/common";
import { natsWrapper } from "../nats-wrapper";
import { Comment } from "../models/Comment";
import { CommentUpdatedPublisher } from "../events/publisher/comment-updated-publisher";
const router = express.Router();

/* Front end updated comment data object is assumed to be-
{   
    comment:{
        content: string,
        id: integer
    }
}*/
router.put(
  "/api/comments/update",
  currentUser,
  async (req: Request, res: Response) => {
    const { comment } = req.body;
    const foundComment = await Comment.findOne({ _id: comment.id });
    if (!foundComment) {
      console.log("Comment not found!");
      throw new NotFoundError();
    }
    foundComment.set({
      content: comment.content,
    });
    await foundComment.save();

    new CommentUpdatedPublisher(natsWrapper.client).publish({
      commentId: foundComment.id,
      content: foundComment.content!,
    });

    console.log("Comment updated");

    res.status(201).send("Comment Updated");
  }
);

export { router as UpdateCommentRouter };
