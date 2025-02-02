const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

// private
const getSelfUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

const updateSelfDetails = asyncHandler(async (req, res, next) => {
  const { carId } = req.body;

  let details = {};
  if (carId) details.carOwned = carId;

  const user = await UserModel.findByIdAndUpdate(req.user._id, details, {
    new: true,
  });

  if (user) {
    res.json({
      success: true,
      user,
    });
  } else {
    res.status(400);
    throw new Error("Failed to update self details");
  }
});

// public
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find()
    .select("-password")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    user: users,
    total: users.length,
  });
});

// public
const getLatestUsers = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .limit(3);

  res.status(200).json({
    success: true,
    user: users,
  });
});

module.exports = {
  getSelfUser,
  updateSelfDetails,
  getAllUsers,
  getLatestUsers,
};
