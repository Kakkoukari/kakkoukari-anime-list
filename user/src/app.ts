import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { getAllUsersRouter } from "./routes/show-all";
import { getAuthenticatedUserRouter } from "./routes/current-user";
import { updateAnimeListRouter } from "./routes/update-info";
import { errorHandler, NotFoundError } from "@devion/common";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
/*Todo import routes*/
app.use(getAllUsersRouter);
app.use(getAuthenticatedUserRouter);
app.use(updateAnimeListRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
