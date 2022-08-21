import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface AnimeAttrs {
  title: string;
  price: number;
  userId: string;
}

interface AnimeModel extends mongoose.Model<AnimeDoc> {
  build(attrs: AnimeAttrs): AnimeDoc;
}

interface AnimeDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}

const AnimeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      default: "undefined",
    },
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
