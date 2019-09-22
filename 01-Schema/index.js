const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const users = require("./routes/index");

/***
 * @description Connecting to mongoDB database
 */
const db = require("./dbconfig/config").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Creating the route to server
 */
app.use("/users", users);

module.exports = app;
