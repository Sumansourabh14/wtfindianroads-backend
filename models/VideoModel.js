const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    uploadedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    uploadedByGuest: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("video", videoSchema);
module.exports = VideoModel;
