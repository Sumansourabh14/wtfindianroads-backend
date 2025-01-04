const asyncHandler = require("express-async-handler");

// private
const getSelfUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = { getSelfUser };
