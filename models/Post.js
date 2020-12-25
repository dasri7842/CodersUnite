const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comments: { type: Array },
    views: { type: Number },
    votes: { type: Number },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
