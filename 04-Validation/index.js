/** Express Server
 * @module server/app
 */

/**
 * @namespace appServer
 */

/**
 * Importing mongoose connection
 */
const mongoose = require("mongoose");
/**
 * Express is a Node.js web application framework
 * @const
 */
const express = require("express");

/**
 * Body parser for  fetching the json objects
 */
const bodyParser = require("body-parser");

const app = express();
const login = require("./router/index");

const db = require("./dbconfig/config").mongoURI;

/**
 * Opening Mongoose Connection
 * @name connect
 * @function
 * @memberof module:connection/mongoose~mongooseConfiguration
 * @inner
 * @param {string} mongoURI - MongoDB Connection URL
 * @param {object} connectionOptions - MongoDB Connection Options
 */
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

/**
 * Initializing BodyParser
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} initialize - Midddleware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Serving Routes
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {string} root - Root Route
 * @param {object} router - Express Router
 */
app.use("/login", login);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
