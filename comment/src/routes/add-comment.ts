import express,{Request, Response} from "express";
import { currentUser } from "@devion/common";
import {Comment} from "../models/Comment"
const router = express.Router();

router.post("/api/comments/add", currentUser, async (req:Request, res:Response)=>{
    const {content, animeId, malId} = req.body;
    console.log("Checking in add comment route", content);

    const addedComment = Comment.build({
        content: content,
        animeId: animeId,
        malId: malId,
        userId: req.currentUser!.id
    });

    await addedComment.save();

    console.log("The newly added comment is:\n", addedComment);

    res.sendStatus(201).send("Comment Added Successfully!");
})


export {router as AddCommentRouter};