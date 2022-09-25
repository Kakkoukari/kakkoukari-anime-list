import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@devion/common";

import { getAllUsersRouter } from "./routes/show-all";
import { getAuthenticatedUserRouter } from "./routes/current-user";
import { updateAnimeListRouter } from "./routes/update-info";
import { getAllUserAnimeRouter } from "./routes/get-anime";
import { AnimePlannedRouter } from "./routes/anime-planned";
import { droppedAnimeRouter } from "./routes/anime-dropped";
import { getAllAnimeListRouter } from "./routes/get-all-list-anime";
import { getOnHoldAnimeListRouter } from "./routes/get-on-hold-list-anime";
import { getWatchingAnimeListRouter } from "./routes/get-watching-list-anime";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(getAllUsersRouter);
app.use(getAuthenticatedUserRouter);
app.use(getAllUserAnimeRouter);
app.use(updateAnimeListRouter);
app.use(AnimePlannedRouter);
app.use(droppedAnimeRouter);
app.use(getAllAnimeListRouter);
app.use(getOnHoldAnimeListRouter);
app.use(getWatchingAnimeListRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
