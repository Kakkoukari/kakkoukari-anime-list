import { Subjects, UserCreatedEvent, Publisher } from "@devion/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
