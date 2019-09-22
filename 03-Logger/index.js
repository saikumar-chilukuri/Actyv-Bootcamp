const log4js = require("log4js");
const express = require("express");
const bodyParser = require("body-parser");

const logfile = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", logfile);

module.exports = app;
