import { Subjects } from "./subjects";

export interface CommentCreatedEvent {
  subject: Subjects.CommentCreated;
  data: {
    username: string;
    content: string;
    malId: string;
    animeId: string;
    userId: string;
    commentId: string;
  };
}