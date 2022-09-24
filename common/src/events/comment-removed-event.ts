import { Subjects } from "./subjects";

export interface CommentRemovedEvent {
  subject: Subjects.CommentRemoved;
  data: {
    commentId: string,
  };
}