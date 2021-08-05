// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

// render all restaurants
app.get("/", (req, res) => {
  res.render("index", {
    restaurants: restaurantList.results
  });
});

// show restaurants info
app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurant});
});

// search function
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const restaurants = restaurantList.results.filter(
    (item) => item.name_en.toLowerCase().includes(keyword) || item.category.includes(keyword)
  );
  res.render("index", { restaurants: restaurants });
});

// start and listen
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
