import { Listener, NotFoundError, Subjects, AnimeListUpdatedEvent} from "@devion/common";
import { Message } from "node-nats-streaming";
import { Anime } from "../../models/Anime";

export class AnimeListUpdatedListener extends Listener<AnimeListUpdatedEvent> {
  subject: Subjects.AnimeListUpdated = Subjects.AnimeListUpdated;
  queueGroupName = "user-service";
  async onMessage(data: AnimeListUpdatedEvent["data"], msg: Message) {
    const animes = await Anime.find({});
    const obtainedAnimeList = data.animelist;
    let index = obtainedAnimeList.length-1;
    while(index)
    {
        const foundAnime = await Anime.findOne({malId: obtainedAnimeList[index].malId});
        if(foundAnime)
            continue;
        const createAnime = await Anime.build({
            titles: obtainedAnimeList[index].titles,
            malId: obtainedAnimeList[index].malId,
            synopsis: obtainedAnimeList[index].synopsis,
            images: obtainedAnimeList[index].images,
            type: obtainedAnimeList[index].type,
            episodes: obtainedAnimeList[index].episodes,
            duration: obtainedAnimeList[index].duration,
            rating: obtainedAnimeList[index].rating,
            score: obtainedAnimeList[index].score,
            genres: obtainedAnimeList[index].genres,
            comments: obtainedAnimeList[index].comments
        });
        index--;
    }
    msg.ack();
  }
}