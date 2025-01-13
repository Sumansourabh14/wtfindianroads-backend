const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
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
    likes: {
      type: Number,
      default: 0, // Optional: Track likes for the discussion
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", commentSchema);
module.exports = CommentModel;
