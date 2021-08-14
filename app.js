// require packages used in the project
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser");
const { findById } = require("./models/restaurant");

// mongoose connection settings
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// route settings //

// render all restaurants
app.get("/", (req, res) => {
  return Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// render new page
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

// show restaurants info
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render("show", { restaurants }))
    .catch((error) => console.log(error));
});

// create function
app.post("/restaurants", (req, res) => {
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.google_map;
  const rating = req.body.rating;
  const description = req.body.description;
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
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render("edit", { restaurants }))
    .catch((error) => console.log(error));
});

// update function
app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.google_map;
  const rating = req.body.rating;
  const description = req.body.description;
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
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurants) => restaurants.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// search function
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const restaurants = restaurantList.results.filter(
    (item) =>
      item.name_en.toLowerCase().includes(keyword) ||
      item.category.includes(keyword)
  );
  if (!restaurants.length) {
    res.render("noresults", { restaurants: restaurants, keyword: keyword });
  }
  res.render("index", { restaurants: restaurants });
});

// start and listen
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
