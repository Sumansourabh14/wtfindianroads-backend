const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

// private
const getSelfUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
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

module.exports = { getSelfUser, getAllUsers, getLatestUsers };
