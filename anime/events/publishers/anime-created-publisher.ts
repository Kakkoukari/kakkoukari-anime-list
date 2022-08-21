import { Publisher, Subjects, AnimeCreatedEvent } from "@devion/common";

export class AnimeCreatedPublisher extends Publisher<AnimeCreatedEvent> {
  readonly subject = Subjects.AnimeCreated;
}
