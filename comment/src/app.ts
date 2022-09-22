import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@devion/common";
const app = express();

//Set app
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    name:"session",
    keys: [process.env.JWT_KEY!],
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
