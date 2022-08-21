import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@devion/common";
import { body } from "express-validator";
import { Anime } from "../models/animes";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/anime",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title must not be empty"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const anime = Anime.build({
      title,
      price: Number(price),
      userId: req.currentUser!.id,
    });

    await anime.save();

    res.status(201).send(anime);
  }
);

export { router as createAnimeRouter };
