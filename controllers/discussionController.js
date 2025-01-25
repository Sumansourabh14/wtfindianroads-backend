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

const deleteDiscussionThread = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("discussionId field is required");
  }

  const discussion = await DiscussionModel.findById(id);

  if (!discussion) {
    res.status(404);
    throw new Error("Discussion not found");
  }

  await DiscussionModel.findByIdAndDelete(discussion._id);

  // remove comments associated with the discussion
  const isDeleted = await CommentModel.deleteMany({
    discussion: discussion._id,
  });

  if (isDeleted) {
    res.json({
      success: true,
      message: `Discussion with id: ${discussion._id} and all its comments have been removed`,
    });
  } else {
    throw new Error("Failed to create the discussion thread");
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

  // update the discussion to include the comment
  const updatedDiscussion = await DiscussionModel.findByIdAndUpdate(
    discussionId,
    { $push: { comments: newComment._id } },
    { new: true } // Return the updated document
  );

  if (newComment && updatedDiscussion) {
    res.status(201).json({
      success: true,
      data: newComment,
    });
  } else {
    throw new Error("Failed to create a comment");
  }
});

const createCommentReply = asyncHandler(async (req, res, next) => {
  const { parentCommentId, description, authorId, discussionId } = req.body;

  if (!description || !authorId || !discussionId || !parentCommentId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const parentComment = await CommentModel.findById(parentCommentId);

  if (!parentComment) {
    res.status(404);
    throw new Error("Parent comment with the given id not found");
  }

  const payload = {
    parentCommentId,
    description,
    author: authorId,
    discussion: discussionId,
  };

  const newComment = await CommentModel.create(payload);

  // update the discussion to include the comment
  const updatedDiscussion = await DiscussionModel.findByIdAndUpdate(
    discussionId,
    { $push: { comments: newComment._id } },
    { new: true } // Return the updated document
  );

  if (newComment && updatedDiscussion) {
    res.status(201).json({
      success: true,
      data: newComment,
      message: "Comment reply has been added",
    });
  } else {
    throw new Error("Failed to create a comment reply");
  }
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const { commentId, discussionId } = req.params;

  if (!commentId || !discussionId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const discussion = await DiscussionModel.findById(discussionId);

  if (!discussion) {
    res.status(404);
    throw new Error("Discussion with the given id not found");
  }

  // Check if the comment exists
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment with the given ID not found.");
  }

  await CommentModel.findByIdAndDelete(commentId);

  // update the discussion to include the comment
  const updatedDiscussion = await DiscussionModel.findByIdAndUpdate(
    discussionId,
    { $pull: { comments: commentId } },
    { new: true }
  );

  if (updatedDiscussion) {
    res.status(200).json({
      success: true,
      message: `Comment with id: ${commentId} has been removed`,
    });
  } else {
    throw new Error(
      "Failed to update the discussion after removing the comment"
    );
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
  getDiscussionById,
  createDiscussionThread,
  deleteDiscussionThread,
  viewAllDiscussionThreads,
  createComment,
  createCommentReply,
  viewAllCommentsOfDiscussion,
  deleteComment,
};
