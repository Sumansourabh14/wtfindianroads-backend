const asyncHandler = require("express-async-handler");
const data = require("../utils/data/trafficRules.json");

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

module.exports = { getRandomRoadTip };
