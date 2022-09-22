import express, { Request, Response } from "express";
import { requireAuth, validateRequest, currentUser } from "@devion/common";
import { body } from "express-validator";
import { Anime } from "../../models/anime";
import axios from "axios";
import { natsWrapper } from "../../nats-wrapper";
import { AnimeListUpdatedPublisher } from "../../events/publishers/anime-added-publisher";

const router = express.Router();

router.get("/api/animes/new", async (req: Request, res: Response) => {
  console.log("new anime");
  let page = 1;
  try {
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

      while (size >= 0 && page >= 1) {
        const animeDetails = response.data.data[size--];
        const anime = await Anime.findOne({ malId: animeDetails.mal_id });

        if (anime) {
          flag = false;
        } else {
          const newAnime = new Anime({
            titles: animeDetails.titles.map((title: any) => {
              return {
                title: title.title.toString() || null,
                type: title.type.toString() || null,
              };
            }),
            type: animeDetails.type || null,
            malId: animeDetails.mal_id,
            images: animeDetails.images.jpg.image_url || null,
            episodes: animeDetails.episodes || null,
            duration: animeDetails.duration || null,
            rating: animeDetails.rating || null,
            score: animeDetails.score || null,
            synopsis: animeDetails.synopsis || null,
            genres:
              animeDetails.genres.map((genre: any) => {
                return {
                  name: genre.name.toString() || null,
                };
              }) || null,
          });
          await newAnime.save();
          animesAdded.push(newAnime);
          count++;
        }
      }
    }

    if (count > 0) {
      new AnimeListUpdatedPublisher(natsWrapper.client).publish({
        animelist: animesAdded.map((anime: any) => {
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
              anime.comments?.map((comment: any) => {
                return {
                  username: comment.username,
                  content: comment.content,
                  userId: comment.userId,
                };
              }) || [],
          };
        }),
      });
    }

    res.status(201).send({ NewAnimesAdded: count });
  } catch (err) {
    console.log("not ok");
    console.log(err);
  }
});

export { router as createAnimeRouter };
