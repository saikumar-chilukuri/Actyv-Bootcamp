/** Express router providing user related routes
 * @module book/routes
 */

/**
 * @namespace bookRouter
 */

/**
 * Express router to mount user related functions on.
 * @const
 */
const express = require("express");
const router = express.Router();

/**
 * Controller Methods responsible for creating and deleting book
 * @const
 */
const { testRoute, addBook, deleteBook } = require("../controller/index");

/**
 *Check wether the router is functional
 * @name /books/test
 * @function
 * @memberof module:book/routes~bookRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/test", testRoute);
/**
 * Route adding the new Book
 * @name /books/add
 * @function
 * @memberof module:book/routes~bookRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/add", addBook);

/**
 * Delete the book record
 * @name /books/delete/:id
 * @function
 * @memberof module:book/routes~bookRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete("/delete/:id", deleteBook);

module.exports = router;
