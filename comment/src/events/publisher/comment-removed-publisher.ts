import { Subjects, Publisher, CommentRemovedEvent } from "@devion/common";

export class CommentRemovedPublisher extends Publisher<CommentRemovedEvent> {
  subject: Subjects.CommentRemoved = Subjects.CommentRemoved;
}
