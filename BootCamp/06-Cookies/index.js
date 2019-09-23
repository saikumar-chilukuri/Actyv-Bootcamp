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
 * Cookie parser for fetching the cookies
 */
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const book = require("./routes/index");

/***
 * @description Connecting to mongoDB database
 */
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
 * Initializing Cookie-Parser
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {method} initialize - Midddleware
 */

app.use(cookieParser());

// app.get("/", function(req, res) {
//   // Cookies that have not been signed
//   console.log("Cookies: ", req.cookies);

//   // Cookies that have been signed
//   console.log("Signed Cookies: ", req.signedCookies);
// });

/**
 * Serving Routes
 * @function
 * @name use
 * @memberof module:server/app~appServer
 * @inner
 * @param {string} root - Root Route
 * @param {object} router - Express Router
 */
app.use("/books", book);

module.exports = app;
