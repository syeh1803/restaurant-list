// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const routes = require('./routes')
require('./config/mongoose')

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(routes)

// start and listen
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});