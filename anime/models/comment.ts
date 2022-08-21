import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface CommentsAttrs {
  content: string;
  animeId: string;
  userId: string;
  username: string;
  malId: string;
  commentId: string;
}

interface CommentsModel extends mongoose.Model<CommentsDoc> {
  build(attrs: CommentsAttrs): CommentsDoc;
}

export interface CommentsDoc extends mongoose.Document {
  content: string;
  animeId: string;
  userId: string;
  username: string;
  malId: string;
  commentId: string;
}

const CommentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    animeId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    malId: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: true,
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

CommentsSchema.statics.build = (attrs: CommentsAttrs) => {
  return new Comment(attrs);
};

CommentsSchema.set("versionKey", "version");
CommentsSchema.plugin(updateIfCurrentPlugin);

const Comment = mongoose.model<CommentsDoc, CommentsModel>(
  "Comments",
  CommentsSchema
);

export { Comment };
