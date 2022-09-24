import { Subjects, Publisher, CommentCreatedEvent } from "@devion/common";

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
  subject: Subjects.CommentCreated = Subjects.CommentCreated;
}
