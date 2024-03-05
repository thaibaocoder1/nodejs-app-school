const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
// Static folder
app.use(express.static(path.join(__dirname, "public")));
// Template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// Routes
app.get("/", (req, res) => {
  res.render("home");
});
// Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
