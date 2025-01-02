const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const signUpController = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await UserModel.findOne({ email });

  if (!!userExists) {
    res.status(401);
    throw new Error("User already exists with this email address.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: user._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("User does not exists with the provided email");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (isPasswordMatched) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "User logged in!",
      user,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Either the password or email is incorrect");
  }
});

const isUsernameAvailableController = asyncHandler(async (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("Username is not filled!");
  }

  // Check if username already exists
  const userIsPresent = await UserModel.findOne({ username: username });

  if (!!userIsPresent) {
    res.status(400);
    throw new Error("Oops! Username is not available!");
  }

  res.status(201).json({
    success: true,
    message: "Username is available!",
  });
});

module.exports = {
  signUpController,
  loginController,
  isUsernameAvailableController,
};
