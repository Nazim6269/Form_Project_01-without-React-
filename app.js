const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/contacts", router);

module.exports = app;
