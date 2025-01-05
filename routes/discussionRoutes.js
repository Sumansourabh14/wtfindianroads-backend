const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createDiscussionThread,
  viewAllDiscussionThreads,
  getDiscussionById,
} = require("../controllers/discussionController");
const router = express.Router();

router.post("/create", authMiddleware, createDiscussionThread);
router.get("/all", viewAllDiscussionThreads);
router.get("/single/:id", getDiscussionById);

module.exports = router;
