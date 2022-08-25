import express, {Request, Response} from "express";
import { currentUser, requireAuth } from "@devion/common";
import {User} from "../models/User";
import {Anime} from "../models/Anime";
import {NotFoundError} from "@devion/common";
const router = express.Router();

router.put("/api/profile/update", currentUser, requireAuth,async (req:Request, res:Response) => {
    const user = await User.findOne({email: req.currentUser?.email});
    if(!user)
        {
            console.log("user not found in user service");
            throw new NotFoundError();
        }
    const updatedAnime = req.body.animeUpdate;
    const savedAnimeList = user.animelist;
    if(updatedAnime)
    {
    const obtainedAnime = await Anime.findOne({malId: updatedAnime.animeId});
    if(!obtainedAnime)
    {
        console.log("Anime not found in user service");
        throw new NotFoundError();
    }
    const updatedList = {
        ...updatedAnime,
        anime: obtainedAnime
    }
    let flag = false;
    savedAnimeList!.forEach(anime => {
        if(anime.animeId == updatedList.animeId)
        {
            anime= updatedList;
            flag = true;
        }
    })
    if(flag == false)
        savedAnimeList!.push(updatedList);
    }
    user.set({animelist: savedAnimeList!,
        profilepic: req.body.profilepic || null});
    await user.save();
    res.status(200).send(user);
});

export { router as updateAnimeListRouter};
