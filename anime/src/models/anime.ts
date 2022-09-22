import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { CommentsDoc } from "./comment";

interface AnimeAttrs {
  titles?: {
    type: string;
    title: string;
  }[];
  type?: string;
  malId: number;
  images?: string;
  episodes?: number;
  duration?: string;
  rating?: string;
  score?: number;
  synopsis?: string;
  genres?: {
    name: string;
  }[];
  comments?: CommentsDoc[];
}

interface AnimeModel extends mongoose.Model<AnimeDoc> {
  build(attrs: AnimeAttrs): AnimeDoc;
}

interface AnimeDoc extends mongoose.Document {
  titles?: {
    type: string;
    title: string;
  }[];
  type?: string;
  malId: number;
  images?: string;
  episodes?: number;
  duration?: string;
  rating?: string;
  score?: number;
  synopsis?: string;
  genres?: {
    name: string;
  }[];
  comments?: CommentsDoc[];
}

const AnimeSchema = new mongoose.Schema(
  {
    titles: [
      {
        type: {
          type: String,
          required: false,
        },
        title: {
          type: String,
          required: false,
        },
        required: false,
      },
    ],
    type: {
      type: String,
      required: false,
    },
    malId: {
      type: Number,
      required: true,
    },
    images: {
      type: String,
      require: false,
    },
    episodes: {
      type: Number,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    rating: {
      type: String,
      required: false,
    },
    score: {
      type: Number,
      required: false,
    },
    synopsis: {
      type: String,
      required: false,
    },
    genres: {
      type: [
        {
          name: {
            type: String,
            required: false,
          },
        },
      ],
      required: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

AnimeSchema.statics.build = (attrs: AnimeAttrs) => {
  return new Anime(attrs);
};

AnimeSchema.set("versionKey", "version");
AnimeSchema.plugin(updateIfCurrentPlugin);

const Anime = mongoose.model<AnimeDoc, AnimeModel>("anime", AnimeSchema);

export { Anime };
