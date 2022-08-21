import express from "express";
import { currentUser } from "@devion/common";
import {User} from "../models/User";
const router = express.Router();

/*Returns all the users*/
router.get("/api/profile", currentUser, async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
});

export { router as getAllUsersRouter};
