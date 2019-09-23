/** Express router providing register related routes
 * @module register/routes
 */

/**
 * @namespace registerRoutes
 */

/**
 * Express router to mount login related functions on.
 * @const
 */
const express = require("express");
const router = express.Router();

/**
 * Controller Methods responsible for register operations
 * @const
 */
const { testRoute, registerUser } = require("../controller/register");

/**
 *Check wether the router is functional
 * @name /register/test
 * @function
 * @memberof module:register/routes~registerRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/test", testRoute);
/**
 * Registering the user
 * @name /register/user
 * @function
 * @memberof module:register/routes~registerRoute
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/user", registerUser);

module.exports = router;
