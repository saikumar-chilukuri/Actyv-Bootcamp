const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const login = require("./router/index");

const db = require("./dbconfig/config").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/login", login);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
