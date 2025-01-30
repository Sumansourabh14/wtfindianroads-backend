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
    res.status(201).json({
      success: true,
      data: newDiscussionThread,
    });
  } else {
    throw new Error("Failed to create a discussion thread");
  }
});

const updateDiscussionThread = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // Get the discussion ID from the request parameters
  const { title, description } = req.body; // Get the fields to update from the request body

  if (!id) {
    res.status(400);
    throw new Error("Discussion ID is required");
  }

  // Build the update payload dynamically
  const updatePayload = {};
  if (title) updatePayload.title = title;
  if (description) updatePayload.description = description;

  // Find and update the discussion
  const updatedDiscussionThread = await DiscussionModel.findByIdAndUpdate(
    id,
    updatePayload,
    { new: true, runValidators: true } // Return the updated document and validate fields
  );

  if (updatedDiscussionThread) {
    res.json({
      success: true,
      data: updatedDiscussionThread,
    });
  } else {
    res.status(404);
    throw new Error("Discussion thread not found");
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

const updateComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const { description } = req.body;

  if (!commentId || !description) {
    res.status(400);
    throw new Error("commentId and description are required");
  }

  // Find the comment by ID
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment with the given id not found");
  }

  // Update the comment description
  const updatedComment = await CommentModel.findByIdAndUpdate(
    commentId,
    { description },
    { new: true } // Return the updated document
  );

  if (updatedComment) {
    res.status(200).json({
      success: true,
      data: updatedComment,
    });
  } else {
    throw new Error("Failed to update the comment");
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

  const updatedComment = await CommentModel.findByIdAndUpdate(
    parentComment,
    { $push: { replies: newComment._id } },
    { new: true } // Return the updated document
  );

  if (newComment && updatedDiscussion && updatedComment) {
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

  // update the discussion to exclude the comment
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

const deleteCommentReply = asyncHandler(async (req, res, next) => {
  const { commentId, parentCommentId, discussionId } = req.params;

  if (!commentId || !parentCommentId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if the comment exists
  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment with the given ID not found.");
  }

  await CommentModel.findByIdAndDelete(commentId);

  // update the parent comment to exclude the comment reply
  const updatedParentComment = await CommentModel.findByIdAndUpdate(
    parentCommentId,
    { $pull: { replies: commentId } },
    { new: true }
  );

  // update discussion to exclude the comment reply
  const updatedDiscussion = await DiscussionModel.findByIdAndUpdate(
    discussionId,
    { $pull: { comments: commentId } },
    { new: true }
  );

  if (updatedParentComment && updatedDiscussion) {
    res.status(200).json({
      success: true,
      message: `Comment reply with id: ${commentId} has been removed`,
    });
  } else {
    throw new Error(
      "Failed to update the comment after removing the comment reply"
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

  const totalComments = await CommentModel.countDocuments({
    discussion: discussionId,
  });

  const comments = await CommentModel.find({
    discussion: discussionId,
    parentCommentId: { $eq: null },
  })
    .populate("author", "username") // Populate only the username field from User
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: comments,
    totalTopLevelComments: comments.length,
    totalComments,
  });
});

const viewAllCommentsOfParentComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;

  const comment = await CommentModel.findById(commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment with the given id not found");
  }

  const comments = await CommentModel.find({ parentCommentId: commentId })
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
  updateDiscussionThread,
  deleteDiscussionThread,
  viewAllDiscussionThreads,
  createComment,
  updateComment,
  createCommentReply,
  viewAllCommentsOfDiscussion,
  viewAllCommentsOfParentComment,
  deleteComment,
  deleteCommentReply,
};
