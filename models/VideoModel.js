const mongoose = require("mongoose");

const roadIncidentValues = [
  "road_accident",
  "road_rage",
  "wrong_side_driving",
  "rash_driving",
  "overspeeding",
  "hit_and_run",
  "pedestrian_accident",
  "drunk_driving",
  "reckless_driving",
  "tailgating",
  "illegal_overtaking",
  "running_red_light",
  "distracted_driving",
  "illegal_u_turn",
  "failure_to_yield",
  "lane_violation",
  "no_seatbelt",
  "motorbike_on_pavement",
  "no_helmet",
  "parking_violation",
  "high_beam_violation",
];

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
    location: {
      type: String,
    },
    incidentType: {
      type: [String],
      enum: roadIncidentValues,
      default: [],
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
