const asyncHandler = require("express-async-handler");
const TripModel = require("../models/TripModel");
const UserModel = require("../models/UserModel");

const createTrip = asyncHandler(async (req, res, next) => {
  const {
    source,
    destination,
    isOneWay,
    vehicleData,
    totalKm,
    foodStops,
    notes,
    userId,
  } = req.body;

  if (!source || !destination || !totalKm) {
    res.status(400);
    throw new Error("Some fields are required");
  }

  const payload = {
    user: userId,
    source,
    destination,
    isOneWay,
    totalKm,
    vehicleUsed: vehicleData,
    foodStops,
    notes,
  };

  const newTrip = await TripModel.create(payload);

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $push: { trips: newTrip._id },
    },
    { new: true }
  );

  if (newTrip && updatedUser) {
    res.status(201).json({
      success: true,
      data: newTrip,
    });
  } else {
    throw new Error("Failed to add trip data");
  }
});

module.exports = { createTrip };
