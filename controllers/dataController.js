const asyncHandler = require("express-async-handler");
const data = require("../utils/data/trafficRules.json");
const FeedbackModel = require("../models/FeedbackModel");

const getRandomRoadTip = asyncHandler((req, res, next) => {
  const categories = data.trafficRulesAndTips;
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const randomRule =
    randomCategory.rules[
      Math.floor(Math.random() * randomCategory.rules.length)
    ];

  res.json({
    success: true,
    category: randomCategory.category,
    rule: randomRule,
  });
});

const postUserFeedback = asyncHandler(async (req, res, next) => {
  const { description } = req.body;

  if (!description) {
    res.status(400);
    throw new Error("Description is required");
  }

  const newFeedback = await FeedbackModel.create({ description });

  res.status(201).json({ success: true, data: newFeedback });
});

module.exports = { getRandomRoadTip, postUserFeedback };
