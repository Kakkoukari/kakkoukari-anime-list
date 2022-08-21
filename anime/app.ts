import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@devion/common";
import { createAnimeRouter } from "./routes/anime/new";
import { getAnimeRouter } from "./routes/anime/show";
import { showAllAnimeRouter } from "./routes/anime/showall";

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
app.use(getAnimeRouter);
app.use(showAllAnimeRouter);
app.use(createAnimeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
