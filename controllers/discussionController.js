const asyncHandler = require("express-async-handler");
const DiscussionModel = require("../models/DiscussionModel");
const CommentModel = require("../models/CommentModel");

const createDiscussionThread = asyncHandler(async (req, res, next) => {
  const { title, description, authorId } = req.body;

  if (!title || !authorId) {
    res.status(400);
    throw new Error("title and authorId field is required");
  }

  const payload = {
    title,
    description,
    author: authorId,
  };

  const newDiscussionThread = await DiscussionModel.create(payload);

  if (!!newDiscussionThread) {
    res.json({
      success: true,
      data: newDiscussionThread,
    });
  } else {
    throw new Error("Failed to create a discussion thread");
  }
});

const createComment = asyncHandler(async (req, res, next) => {
  const { description, authorId, discussionId } = req.body;

  if (!description || !authorId || !discussionId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const discussion = await DiscussionModel.findById(discussionId);

  if (!discussion) {
    res.status(404);
    throw new Error("Discussion with the given id not found");
  }

  const payload = {
    description,
    author: authorId,
    discussion: discussionId,
  };

  const newComment = await CommentModel.create(payload);

  if (!!newComment) {
    res.json({
      success: true,
      data: newComment,
    });
  } else {
    throw new Error("Failed to create a comment");
  }
});

const viewAllCommentsOfDiscussion = asyncHandler(async (req, res, next) => {
  const { discussionId } = req.params;

  const discussion = await DiscussionModel.findById(discussionId);

  if (!discussion) {
    res.status(404);
    throw new Error("Discussion with the given id not found");
  }

  const comments = await CommentModel.find({ discussion: discussionId })
    .populate("author", "username") // Populate only the username field from User
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: comments,
    total: comments.length,
  });
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
  createComment,
  viewAllCommentsOfDiscussion,
};
