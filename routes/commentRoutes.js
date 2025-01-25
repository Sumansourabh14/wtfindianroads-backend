const express = require("express");
const {
  createComment,
  viewAllCommentsOfDiscussion,
  deleteComment,
  createCommentReply,
  viewAllCommentsOfParentComment,
  deleteCommentReply,
} = require("../controllers/discussionController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/all/:discussionId", viewAllCommentsOfDiscussion);
router.get("/all/replies/:commentId", viewAllCommentsOfParentComment);
router.post("/create", authMiddleware, createComment);
router.post("/create-comment-reply", authMiddleware, createCommentReply);
router.delete(
  "/delete/:commentId/:discussionId",
  authMiddleware,
  deleteComment
);
router.delete(
  "/delete/reply/:parentCommentId/:commentId",
  authMiddleware,
  deleteCommentReply
);

module.exports = router;
