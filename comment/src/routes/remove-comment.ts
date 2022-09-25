import express, { Request, Response } from "express";
import { currentUser, NotFoundError } from "@devion/common";
import { Comment } from "../models/Comment";
import { CommentRemovedPublisher } from "../events/publisher/comment-removed-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

/* Front end updated comment data object is assumed to be-
{   
    id: int
}*/
router.get(
  "/api/comments/remove",
  currentUser,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    Comment.deleteOne({ _id: id })
      .then(() => {
        console.log("Successfully Deleted");
      })
      .catch((err) => {
        console.log(err);
      });

    new CommentRemovedPublisher(natsWrapper.client).publish({
      commentId: id,
    });

    res.status(202).send("Comment Deleted");
  }
);

export { router as RemoveCommentRouter };
