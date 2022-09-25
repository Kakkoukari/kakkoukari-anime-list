import { Subjects, Publisher, CommentUpdatedEvent } from "@devion/common";

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
  subject: Subjects.CommentUpdated = Subjects.CommentUpdated;
}
