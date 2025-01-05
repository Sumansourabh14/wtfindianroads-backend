const asyncHandler = require("express-async-handler");
const DiscussionModel = require("../models/DiscussionModel");

const createDiscussionThread = asyncHandler(async (req, res, next) => {
  const { title, description, authorId } = req.body;

  if (!title || !authorId) {
    res.status(400);
    throw new Error("title and authorId field is required");
  }

  const paylod = {
    title,
    description,
    author: authorId,
  };

  const newDiscussionThread = await DiscussionModel.create(paylod);

  if (!!newDiscussionThread) {
    res.json({
      success: true,
      data: newDiscussionThread,
    });
  } else {
    throw new Error("Failed to create a discussion thread");
  }
});

const viewAllDiscussionThreads = asyncHandler(async (req, res, next) => {
  const discussionThreads = await DiscussionModel.find()
    .populate("author", "username") // Populate only the username field from User
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: discussionThreads,
    total: discussionThreads.length,
  });
});

const getDiscussionById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const discussionThread = await DiscussionModel.findById(id).populate(
    "author",
    "username" // Only include the username field from the User model
  );

  if (!discussionThread) {
    res.status(404);
    throw new Error("Discussion not found");
  }

  res.json({
    success: true,
    data: discussionThread,
  });
});

module.exports = {
  createDiscussionThread,
  viewAllDiscussionThreads,
  getDiscussionById,
};
