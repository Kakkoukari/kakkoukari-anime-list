import mongoose from "mongoose";
import { AnimeDoc } from "./Anime";
// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  username: string;
  profilepic?: string;
  animelist?: {
    anime: AnimeDoc;
    animeId: string;
    userRating: number;
    episodesWatched: number;
    status: string;
  }[];
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  profilepic?: string;
  animelist?: {
    anime?: AnimeDoc;
    animeId?: string;
    userRating?: number;
    episodesWatched?: number;
    status?: string;
  }[];
  username: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    profilepic: {
      type: String,
      required: false,
      default: null,
    },
    animelist: [
      {
        anime: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Anime",
          required: false,
        },
        animeId: {
          type: String,
          required: false,
          default: null,
        },
        userRating: {
          type: Number,
          default: null,
          required: false,
        },
        episodesWatched: {
          type: Number,
          default: null,
          required: false,
        },
        status: {
          type: String,
          default: null,
          required: false,
        },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
