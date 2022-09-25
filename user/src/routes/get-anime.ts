import express from "express";
import { currentUser } from "@devion/common";
import { Anime } from "../models/Anime";
import { AnimeListUpdatedListener } from "../events/listeners/anime-list-updated-listener";
const router = express.Router();

/*Returns all the users*/
/*Only For Debugging*/
router.get("/api/profile/animes", async (req, res) => {
  const animes = await Anime.find({});
  res.status(200).send(animes);
});

export { router as getAllUserAnimeRouter };
