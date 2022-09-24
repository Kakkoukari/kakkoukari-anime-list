import mongoose from "mongoose";

interface CommentAttrs {
  content?: string;
  animeId?: string;
  malId?: string;
  username?: string;
  userId?: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

export interface CommentDoc extends mongoose.Document {
  content?: string;
  animeId?: string;
  malId?: string;
  userId?: string;
  username?: string;
}

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
    },
    animeId: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
    malId: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

CommentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  CommentSchema
);

export { Comment };
