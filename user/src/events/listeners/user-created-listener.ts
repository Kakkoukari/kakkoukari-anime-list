import { Listener, NotFoundError, Subjects, UserCreatedEvent } from "@devion/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/User";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "user-service";
  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const user = User.build({
      username: data.username,
      email: data.email,
    });
    await user.save();
    msg.ack();
  }
}