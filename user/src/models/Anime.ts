import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { createStringLiteralFromNode } from "typescript";

interface AnimeAttrs {
  titles: 
    {
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
  comments?: {
    username: string;
    content: string;
    userId: string;
  }[]
}

interface AnimeModel extends mongoose.Model<AnimeDoc> {
  build(attrs: AnimeAttrs): AnimeDoc;
}

export interface AnimeDoc extends mongoose.Document {
  titles: {
    type: string;
    title: string;
  };
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
  comments?: {
    username: string;
    content: string;
    userId: string;
  }[]
}

const AnimeSchema = new mongoose.Schema(
  {
    titles: [
      {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
      },
    ],
    type: {
        type:String,
        required: false
    },
    malId: {
        type: String,
        required: false
    },
    images: {
        type: String,
        required: false
    },
    episodes: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    rating: {
        type: String,
        required: false
    },
    score: {
        type: Number,
        required: false
    },
    synopsis: {
        type: String,
        required: false
    },
    genres:{
    type: [
      {
        name: {
            type: String,
            required: false
        },
      },
    ],
    required: true    
    },
    comments:{
        type: [
        {
            username: {
                type: String,
                required: false
            },
            content: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            }
        }
        ],
        required: false
    }   
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
