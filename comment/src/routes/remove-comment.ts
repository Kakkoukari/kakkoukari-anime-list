import express,{Request, Response} from "express";
import { currentUser, NotFoundError } from "@devion/common";
import {Comment} from "../models/Comment";
const router = express.Router();

/* Front end updated comment data object is assumed to be-
{   
    id: int
}*/
router.get("/api/comments/remove", currentUser, async (req:Request, res:Response)=>{
    const {id} = req.body;
    Comment.deleteOne({_id: id}).then(()=>{
        console.log("Successfully Deleted");
    }).catch((err)=>{
        console.log(err);
    });
    res.status(202).send("Comment Deleted");
})

export {router as RemoveCommentRouter};