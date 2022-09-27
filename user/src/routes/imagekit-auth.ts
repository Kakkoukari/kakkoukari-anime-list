import express, { Request, Response } from "express";
import axios from "axios";
var ImageKit = require("imagekit");
var fs = require("fs");

const router = express.Router();

var imagekit = new ImageKit({
  publicKey: "public_dsXTppgbqawpxVbXVdUF/zx9ykA=",
  privateKey: "private_Ee7a9yKvfu4RGgnh+UIUwjSbrnQ=",
  urlEndpoint: "https://ik.imagekit.io/upzhdydew",
});

// get imagekit authentication parameters
router.post("/api/profile/imagekit", (req: Request, res: Response) => {
  console.log("profilepic", req.body.profilepic);
  axios
    .post("https://upload.imagekit.io/api/v1/files/upload", {
      file: req.body.profilepic,
      fileName: "profilepic",
      useUniqueFileName: true,
    })
    .then((response) => {
      res.send({ url: response.data.url });
    })
    .catch((error) => {
      console.log(error);
    });
});

export { router as imagekitAuthRouter };
