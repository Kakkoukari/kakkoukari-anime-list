import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface AnimeAttrs {
  titles: [
    {
      type: string;
      title: string;
    }
  ];
  type: string;
  malId: number;
  images: string;
  episodes: number;
  duration: string;
  rating: string;
  score: number;
  synopsis: string;
  genres: {
    name: string;
  }[];
}

interface AnimeModel extends mongoose.Model<AnimeDoc> {
  build(attrs: AnimeAttrs): AnimeDoc;
}

interface AnimeDoc extends mongoose.Document {
  titles: {
    type: string;
    title: string;
  }[];
  type: string;
  malId: number;
  images: string;
  episodes: number;
  duration: string;
  rating: string;
  score: number;
  synopsis: string;
  genres: {
    name: string;
  }[];
}

const AnimeSchema = new mongoose.Schema(
  {
    titles: [
      {
        type: String,
        title: String,
      },
    ],
    type: String,
    malId: Number,
    images: String,
    episodes: Number,
    duration: String,
    rating: String,
    score: Number,
    synopsis: String,
    genres: [
      {
        name: String,
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
