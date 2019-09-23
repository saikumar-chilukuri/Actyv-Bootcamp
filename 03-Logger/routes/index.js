/** Express router providing user related routes
 * @module routes
 */

/**
 * @namespace logRoutes
 */

/**
 * Express router to mount user related functions on.
 * @const
 */
const express = require("express");
const router = express.Router();

/***
 * Logger Initializatio for creating the records
 * @const
 */
const log = require("log4js").getLogger("index");

/**
 *Getting the parent or the index route.
 * @name /
 * @function
 * @memberof module:/routes~logRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/", function(req, res) {
  log.debug("This is in the first log module");
  res.send("I am in first log");
});

/**
 *Routing to the second page
 * @name /log2
 * @function
 * @memberof module:/routes~logRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/log2", function(req, res) {
  log.debug("This is the second log module");
  res.send("I am in second log");
});
/**
 *Getting the errors from route
 * @name /log/error
 * @function
 * @memberof module:/routes~logRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/log/error", function(req, res) {
  log.error("This is the error log module");
  res.error("I am in error log");
});

module.exports = router;
