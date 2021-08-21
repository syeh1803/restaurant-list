const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

// render new page
router.get("/new", (req, res) => {
  return res.render("new");
});

// show restaurants info
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render("show", { restaurants }))
    .catch((error) => console.log(error));
});

// create function
router.post("/", (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// edit function
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render("edit", { restaurants }))
    .catch((error) => console.log(error));
});

// update function
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return Restaurant.findById(id)
    .then((restaurants) => {
      restaurants.name = name;
      restaurants.name_en = name_en;
      restaurants.category = category;
      restaurants.image = image;
      restaurants.location = location;
      restaurants.phone = phone;
      restaurants.google_map = google_map;
      restaurants.rating = rating;
      restaurants.description = description;
      return restaurants.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

// delete function
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurants) => restaurants.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
