const catchAsync = require("express-async-handler");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decodedData = jwt.verify(token, process.env.SECRET);

      req.user = await UserModel.findById(decodedData.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid or expired token");
    }
  } else {
    res.status(401);
    throw new Error("Token must be provided");
  }
});

// Middleware for optional authentication
const optionalAuthMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedData = jwt.verify(token, process.env.SECRET);

      req.user = await UserModel.findById(decodedData.id).select("-password");
    } catch (error) {
      console.error("Invalid token:", error.message);
      req.user = null; // Explicitly set req.user to null for invalid tokens
    }
  } else {
    req.user = null; // Explicitly set req.user to null for no token
  }

  next();
};

module.exports = { authMiddleware, optionalAuthMiddleware };
