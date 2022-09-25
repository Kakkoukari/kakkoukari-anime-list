import express from "express";
import { currentUser, NotFoundError } from "@devion/common";
import { User } from "../models/User";
import { AnimeListUpdatedListener } from "../events/listeners/anime-list-updated-listener";
const router = express.Router();

/*Returns all the users*/
router.get("/api/profile/animes/all", currentUser, async (req, res) => {
  const user = await User.findOne({ email: req.currentUser?.email });
  if (!user) {
    console.log("user not found in user service");
    throw new NotFoundError();
  }
  console.log(user.animelist);
  res.status(200).send(user.animelist);
});

export { router as getAllAnimeListRouter };
