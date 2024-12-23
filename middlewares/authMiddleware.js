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

    const decodedData = jwt.verify(token, process.env.SECRET);

    req.user = await UserModel.findById(decodedData.id).select("-password");

    next();
  } else {
    res.status(401);
    throw new Error("Invalid token");
  }
});

module.exports = authMiddleware;
