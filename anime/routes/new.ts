import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@devion/common";
import { body } from "express-validator";
import { Anime } from "../models/animes";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/anime",
  requireAuth,
  [body("malId").not().isEmpty().withMessage("Mal ID must not be empty")],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      titles,
      type,
      malId,
      images,
      episodes,
      duration,
      rating,
      score,
      synopsis,
      genres,
    } = req.body;

    const anime = Anime.build({
      titles,
      type,
      malId,
      images,
      episodes,
      duration,
      rating,
      score,
      synopsis,
      genres,
    });

    await anime.save();

    res.status(201).send(anime);
  }
);

export { router as createAnimeRouter };
