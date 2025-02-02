const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    carOwned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "car", // Reference to the Car model
    },
    trips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trip",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
