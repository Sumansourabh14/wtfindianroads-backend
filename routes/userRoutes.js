const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  getSelfUser,
  getAllUsers,
  getLatestUsers,
  updateSelfDetails,
} = require("../controllers/userController");
const router = express.Router();

router.get("/self", authMiddleware, getSelfUser);
router.patch("/self", authMiddleware, updateSelfDetails);
router.get("/all", getAllUsers);
router.get("/latest", getLatestUsers);

module.exports = router;
