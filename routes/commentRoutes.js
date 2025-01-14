const express = require("express");
const {
  createComment,
  viewAllCommentsOfDiscussion,
  deleteComment,
} = require("../controllers/discussionController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/all/:discussionId", viewAllCommentsOfDiscussion);
router.post("/create", authMiddleware, createComment);
router.delete(
  "/delete/:commentId/:discussionId",
  authMiddleware,
  deleteComment
);

module.exports = router;
