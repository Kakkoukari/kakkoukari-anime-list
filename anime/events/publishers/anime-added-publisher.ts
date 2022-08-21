import { Subjects, AnimeListUpdatedEvent, Publisher } from "@devion/common";

export class AnimeListUpdatedPublisher extends Publisher<AnimeListUpdatedEvent> {
  subject: Subjects.AnimeListUpdated = Subjects.AnimeListUpdated;
}
