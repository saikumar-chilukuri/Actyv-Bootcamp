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

const { indexlog, secondlog, errorlog } = require("../controllers/index");
/**
 *Getting the parent or the index route.
 * @name /
 * @function
 * @memberof module:/routes~logRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/", indexlog);

/**
 *Routing to the second page
 * @name /log2
 * @function
 * @memberof module:/routes~logRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/log2", secondlog);
/**
 *Getting the errors from route
 * @name /log/error
 * @function
 * @memberof module:/routes~logRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/log/error", errorlog);

module.exports = router;
