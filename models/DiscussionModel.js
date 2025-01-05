const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Optional: Limit the title length
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
    comments: [
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

const DiscussionModel = mongoose.model("discussion", discussionSchema);
module.exports = DiscussionModel;
