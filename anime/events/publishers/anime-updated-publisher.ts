import { Publisher, Subjects, AnimeUpdatedEvent } from "@devion/common";

export class AnimeUpdatedPublisher extends Publisher<AnimeUpdatedEvent> {
  readonly subject = Subjects.AnimeUpdated;
}
