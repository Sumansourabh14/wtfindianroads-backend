const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
      default: null,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 600,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user who created the discussion
      ref: "user",
      required: true,
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user who created the discussion
      ref: "discussion",
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId, // References to comments (optional)
        ref: "comment",
      },
    ],
    likes: {
      type: Number,
      default: 0, // Optional: Track likes for the discussion
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", commentSchema);
module.exports = CommentModel;
