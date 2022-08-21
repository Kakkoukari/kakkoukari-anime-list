import mongoose from "mongoose";
import {AnimeDoc} from "./Anime";
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
    anime: AnimeDoc;
    animeId: string;
    userRating?: number;
    episodesWatched: number;
    status: string;    
}[];
  username:string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilepic: {
        type: String,
        required: false,
    },
    animelist: [
        {
            anime:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Anime",
                required: false,},
            animeId: {
                type: String,
                required: true,
            },
            userRating: {
                type: Number,
                required: false,
            },
            episodesWatched: {
                type: Number,
                required: true,
            }, 
            status: {
                type: String,
                required: true,
            }
        }
    ]
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
