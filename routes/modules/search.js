const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

// search function
router.get("/", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  const keywordRegex = new RegExp(keyword, "i");
  Restaurant.find({
    $or: [
      { category: { $regex: keywordRegex } },
      { name: { $regex: keywordRegex } },
    ],
  })
    .lean()
    .then((restaurants) => {
      res.render("index", { restaurants, keyword });
    });
});

module.exports = router;
