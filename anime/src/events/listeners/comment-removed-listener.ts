import { Subjects, Listener, CommentRemovedEvent } from "@devion/common";
import { Message } from "node-nats-streaming";
import { Comment } from "../../models/comment";

export class CommentRemovedListener extends Listener<CommentRemovedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentRemoved;
  queueGroupName = "anime-service";
  async onMessage(data: CommentRemovedEvent["data"], msg: Message) {
    console.log("Comment created listener", data);
    Comment.deleteOne({commentId: data.commentId}).then(()=>{
        console.log("deleted successfully from Anime Service Comment DB")
    }).catch((err)=>{console.log(err)})
    msg.ack();
  }
}
