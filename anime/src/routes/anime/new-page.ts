import express, { Request, Response } from "express";
import { Anime } from "../../models/anime";
import axios from "axios";
import { natsWrapper } from "../../nats-wrapper";
import { AnimeListUpdatedPublisher } from "../../events/publishers/anime-added-publisher";

const router = express.Router();

router.get("/api/animes/new/:id", async (req: Request, res: Response) => {
  let page = req.params.id;
  try {
    let response = await axios({
      method: "get",
      url: `https://api.jikan.moe/v4/anime?page=${page}`,
    });

    let count = 0;
    const animesAdded = [];

    let size = response.data.data.length - 1;

    while (size >= 0) {
      const animeDetails = response.data.data[size--];
      const anime = await Anime.findOne({ malId: animeDetails.mal_id });

      if (anime) {
      } else {
        const newAnime = new Anime({
          titles: animeDetails.titles,
          type: animeDetails.type,
          malId: animeDetails.mal_id,
          images: animeDetails.images.jpg.image_url,
          episodes: animeDetails.episodes,
          duration: animeDetails.duration,
          rating: animeDetails.rating,
          score: animeDetails.score,
          synopsis: animeDetails.synopsis,
          genres: animeDetails.genres,
        });
        await newAnime.save();
        animesAdded.push(newAnime);
        count++;
      }
    }

    if (count > 0) {
      new AnimeListUpdatedPublisher(natsWrapper.client).publish({
        animelist: animesAdded.map((anime) => {
          return {
            titles: anime.titles,
            type: anime.type,
            malId: anime.malId,
            images: anime.images,
            episodes: anime.episodes,
            duration: anime.duration,
            rating: anime.rating,
            score: anime.score,
            synopsis: anime.synopsis,
            genres: anime.genres,
            comments:
              anime.comments?.map((comment) => {
                return {
                  username: comment.username,
                  content: comment.content,
                  userId: comment.userId,
                };
              }) || [],
          };
        }),
      });
      res.status(201).send({ animesAdded: count });
    }
    res.status(200).send({ animesAdded: count });
  } catch (error) {
    console.log(error);
  }
});

export { router as createAnimePageRouter };
