const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

// sort function
// A -> Z
router.get("/asc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name_en: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// Z -> A
router.get("/desc", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name_en: "desc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// By Category
router.get("/category", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// By Location
router.get("/location", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ location: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

module.exports = router;
