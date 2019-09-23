/** Express router providing user related routes
 * @module users/routes
 */

/**
 * @namespace usersRouter
 */

/**
 * Express router to mount user related functions on.
 * @const
 */
const express = require("express");
const router = express.Router();

/**
 * Controller Methods responsible for user CRUD operations
 * @const
 */
const {
  testRoute,
  createUser,
  readUser,
  updataeUser,
  deleteUser
} = require("../controller/index");

/**
 *Check wether the router is functional
 * @name /users/test
 * @function
 * @memberof module:users/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/test", testRoute);
/**
 * Route creating a new user instance
 * @name /users/create
 * @function
 * @memberof module:users/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/create", createUser);
/**
 *Read the user detail by id params
 * @name /users/read/:id 
 * @function
 * @memberof module:users/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/read/:id", readUser);

/**
 * Updates the existing values by id params
 * @name /users/update/:id
 * @function
 * @memberof module:user/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put("/update/:id", updataeUser);

/**
 * Delete the user from the database
 * @name /users/delete/:id
 * @function
 * @memberof module:users/routes~usersRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete("/delete/:id", deleteUser);

module.exports = router;
