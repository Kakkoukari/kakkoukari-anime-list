import { Subjects, Listener, CommentUpdatedEvent } from "@devion/common";
import { Message } from "node-nats-streaming";
import { Comment } from "../../models/comment";

export class CommentUpdatedListener extends Listener<CommentUpdatedEvent> {
  subject: Subjects.CommentUpdated = Subjects.CommentUpdated;
  queueGroupName = "anime-service";
  async onMessage(data: CommentUpdatedEvent["data"], msg: Message) {
    console.log("Comment created listener", data);

    const comment = await Comment.findOne({
      commentId: data.commentId,
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    comment.set({
      content: data.content,
    });

    await comment.save();

    msg.ack();
  }
}
