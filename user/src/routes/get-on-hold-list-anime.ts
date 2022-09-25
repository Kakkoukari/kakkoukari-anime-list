import express from "express";
import { currentUser, NotFoundError, AnimeStatus } from "@devion/common";
import { User } from "../models/User";
import { AnimeListUpdatedListener } from "../events/listeners/anime-list-updated-listener";
const router = express.Router();

/*Returns all the users*/
router.get("/api/profile/animes/onhold", currentUser, async (req, res) => {
  const user = await User.findOne({ email: req.currentUser?.email });
  if (!user) {
    console.log("user not found in user service");
    throw new NotFoundError();
  }
  const onHoldList = user.animelist!.filter((anime: any) => {
    return anime.status == AnimeStatus.OnHold;
  });
  res.status(200).send(onHoldList);
});

export { router as getAllAnimeListRouter };
