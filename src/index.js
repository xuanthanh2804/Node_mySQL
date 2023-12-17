const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");
require("dotenv").config();
const route = require("./routes");
const app = express();
const port = process.env.PORT || 8081;

//Connect DB
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  database: "testdb",
  password: "123456",
});

connection.query("SELECT * FROM members", function (err, results, fields) {
  console.log(">>> result=", results); // results contains rows returned by server
  console.log(">>> fields=", fields); // fields contains extra meta data about results, if available
});

//post
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static file
app.use(express.static(path.join(__dirname, "public")));

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
