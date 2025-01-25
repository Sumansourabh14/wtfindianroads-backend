const express = require("express");
const {
  createComment,
  viewAllCommentsOfDiscussion,
  deleteComment,
  createCommentReply,
  viewAllCommentsOfParentComment,
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

module.exports = router;
