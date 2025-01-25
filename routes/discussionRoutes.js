const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createDiscussionThread,
  viewAllDiscussionThreads,
  getDiscussionById,
  deleteDiscussionThread,
  updateDiscussionThread,
} = require("../controllers/discussionController");
const router = express.Router();

router.get("/all", viewAllDiscussionThreads);
router.get("/single/:id", getDiscussionById);
router.post("/create", authMiddleware, createDiscussionThread);
router.patch("/update/:id", authMiddleware, updateDiscussionThread);
router.delete("/delete/:id", authMiddleware, deleteDiscussionThread);

module.exports = router;
