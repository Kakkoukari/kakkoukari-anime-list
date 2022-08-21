import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
} from "@devion/common";
import { body } from "express-validator";
import { Anime } from "../models/animes";
const router = express.Router();

router.put(
  "/api/anime/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      throw new NotFoundError();
    }

    if (anime.orderId) {
      throw new BadRequestError("Cannot edit a reserved anime");
    }

    if (anime.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    anime.set({
      title,
      price,
    });

    await anime.save();
    res.status(201).send(anime);
  }
);

export { router as updateAnimeRouter };
