const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    isOneWay: {
      type: Boolean,
      default: false,
    },
    vehicleUsed: {
      brand: String,
      model: String,
      year: Number,
      fuelType: {
        type: String,
        enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
      },
    },
    foodStops: {
      type: Array,
    },
    totalKm: {
      type: Number,
      required: true,
    },
    notes: {
      type: String, // Any additional trip notes or experiences
    },
  },
  { timestamps: true }
);

const TripModel = mongoose.model("trip", tripSchema);
module.exports = TripModel;
