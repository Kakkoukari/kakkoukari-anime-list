import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@devion/common";
import { createAnimeRouter } from "./routes/anime/new";
import { getAnimeRouter } from "./routes/anime/show";
import { showAllAnimeRouter } from "./routes/anime/showall";
import { createAnimePageRouter } from "./routes/anime/new-page";
import { getCommentRouter } from "./routes/comment/show";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createAnimeRouter);
app.use(getAnimeRouter);
app.use(getCommentRouter);
app.use(createAnimePageRouter);
app.use(showAllAnimeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export default app;
