import { Subjects, Listener, CommentCreatedEvent } from "@devion/common";
import { Comment } from "../../models/comment";

export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
  queueGroupName = "anime-service";
  async onMessage(data: CommentCreatedEvent["data"]) {
    console.log("Comment created listener", data);

    const comment = Comment.build({
      animeId: data.animeId,
      userId: data.userId,
      username: data.username,
      content: data.content,
      malId: data.malId,
      commentId: data.commentId,
    });
    await comment.save();
  }
}
