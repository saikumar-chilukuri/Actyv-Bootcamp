/** Express router providing login related routes
 * @module login/routes
 */

/**
 * @namespace loginRouter
 */

/**
 * Express router to mount login related functions on.
 * @const
 */ 
const express = require("express");
const router = express.Router();

/** 
 * Controller Methods for logging and getting current user
 * @const
 */
const { testRoute, loginUser, currentUser } = require("../controller/login");

/**
 *Check wether the router is functional
 * @name /login/test
 * @function
 * @memberof module:login/routes~loginRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/test", testRoute);
/**
 * Registering the user
 * @name /login/current
 * @function
 * @memberof module:login/routes~loginRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/user", loginUser);

/**
 *Get the current active user
 * @name /login/current
 * @function
 * @memberof module:login/routes~loginRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/current", currentUser);

module.exports = router;
