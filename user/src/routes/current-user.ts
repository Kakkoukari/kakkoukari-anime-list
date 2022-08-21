import express from "express";
import { currentUser } from "@devion/common";
import {User} from "../models/User";
import { NotFoundError } from "@devion/common";
const router = express.Router();

/*Returns all the users*/
router.get("/api/profile/current", currentUser, async (req, res) => {
  const authUser = await User.findOne({email: req.currentUser?.email});
  if(!authUser)
    {
        throw new NotFoundError();
    }
  res.status(200).send(authUser);
});

export { router as getAuthenticatedUserRouter};
