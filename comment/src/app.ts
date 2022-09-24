import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@devion/common";
import { AddCommentRouter } from "./routes/add-comment";
import { GetAllCommentRouter } from "./routes/show-all-comment";
import { UpdateCommentRouter } from "./routes/update-comment";
const app = express();

//Set app
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_KEY!],
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

//Routes
app.use(AddCommentRouter);
app.use(GetAllCommentRouter);
app.use(UpdateCommentRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
