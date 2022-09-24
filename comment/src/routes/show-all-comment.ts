import express,{Request, Response} from "express";
import { currentUser } from "@devion/common";
import {Comment} from "../models/Comment";
const router = express.Router();

router.get("/api/comments/show", currentUser, async (req:Request, res:Response)=>{
    const comments = await Comment.find({});
    console.log("Getting All comments, ", comments);
    res.sendStatus(200).send(comments);
})

export {router as GetAllCommentRouter};