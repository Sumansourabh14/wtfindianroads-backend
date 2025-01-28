const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const FeedbackModel = mongoose.model("feedback", feedbackSchema);
module.exports = FeedbackModel;
