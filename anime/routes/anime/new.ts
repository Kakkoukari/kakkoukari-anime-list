import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@devion/common";
import { body } from "express-validator";
import { Anime } from "../../models/anime";
import axios from "axios";
import { natsWrapper } from "../../nats-wrapper";
import { AnimeListUpdatedPublisher } from "../../events/publishers/anime-added-publisher";

const router = express.Router();

router.post(
  "/api/anime/new",
  requireAuth,
  async (req: Request, res: Response) => {
    let page = 1;

    let response = await axios({
      method: "get",
      url: `https://api.jikan.moe/v4/anime?page=${page}`,
    });
    page = response.data.pagination.last_visible_page;
    let flag = true;
    let count = 0;
    const animesAdded = [];

    while (flag) {
      response = await axios({
        method: "get",
        url: `https://api.jikan.moe/v4/anime?page=${page}`,
      });

      let size = response.data.data.length - 1;

      while (size >= 0 && flag) {
        const animeDetails = response.data.data[size--];
        const anime = await Anime.findOne({ malId: animeDetails.mal_id });

        if (anime) {
          flag = false;
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
    }

    if (count > 0) {
      new AnimeListUpdatedPublisher(natsWrapper.client).publish({
        animeList: animesAdded,
      });
    }

    res.status(201).send({ NewAnimesAdded: count });
  }
);

export { router as createAnimeRouter };
