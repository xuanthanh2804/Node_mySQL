const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");
require("dotenv").config();
const route = require("./routes");
const app = express();
const port = process.env.PORT || 8081;

//post
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Template engine
app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
route(app);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
