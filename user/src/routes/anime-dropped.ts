import express from "express";
import { currentUser } from "@devion/common";
import { User } from "../models/User";
import { NotFoundError, AnimeStatus } from "@devion/common";
const router = express.Router();

router.put("/api/profile/animes/dropped", currentUser, async (req, res) => {
  const { animeId } = req.body;
  const authUser = await User.findOne({ email: req.currentUser?.email });

  if (!authUser) {
    throw new NotFoundError();
  }

  const anime = authUser.animelist!.find(
    (anime: any) => anime.animeId === animeId
  );
  if (anime) {
    anime.status = AnimeStatus.Dropped;
  }

  await authUser.save();

  res.status(200).send({ message: "Anime Dropped" });
});

export { router as droppedAnimeRouter };
