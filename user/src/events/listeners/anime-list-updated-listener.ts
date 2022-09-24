import {
  Listener,
  NotFoundError,
  Subjects,
  AnimeListUpdatedEvent,
} from "@devion/common";
import { Message } from "node-nats-streaming";
import { Anime } from "../../models/Anime";

export class AnimeListUpdatedListener extends Listener<AnimeListUpdatedEvent> {
  subject: Subjects.AnimeListUpdated = Subjects.AnimeListUpdated;
  queueGroupName = "user-service";
  async onMessage(data: AnimeListUpdatedEvent["data"], msg: Message) {
    const animes = await Anime.find({});
    const obtainedAnimeList = data.animelist;
    let length = obtainedAnimeList!.length;
    let index = length - 1;
    while (index > -1) {
      const foundAnime = await Anime.findOne({
        malId: obtainedAnimeList![index].malId,
      });
      if (foundAnime) continue;
      const createAnime = Anime.build({
        titles:
          obtainedAnimeList![index].titles.map((title: any) => {
            return { type: title.type || null, title: title.title || null };
          }) || [],
        malId: obtainedAnimeList![index].malId,
        synopsis: obtainedAnimeList![index].synopsis || undefined,
        images: obtainedAnimeList![index].images || undefined,
        type: obtainedAnimeList![index].type || undefined,
        episodes: obtainedAnimeList![index].episodes || undefined,
        duration: obtainedAnimeList![index].duration || undefined,
        rating: obtainedAnimeList![index].rating || undefined,
        score: obtainedAnimeList![index].score || undefined,
        genres: obtainedAnimeList![index].genres || [],
        comments: obtainedAnimeList![index].comments || [],
      });

      await createAnime.save();
      index--;
    }
    msg.ack();
  }
}
