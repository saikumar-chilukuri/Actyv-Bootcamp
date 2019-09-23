/** Book Controller
 * @module book/controller
 */

/**
 * @namespace bookController
 */

/**
 * Mongoose Model for Book.
 * @const
 */
const Book = require("../models/Book");

/**
 * Controller to check the fucntioning of route
 * @name testRoute
 * @function
 * @memberof module:book/controller~bookController
 * @inner
 * @param {Object} request - NULL
 * @param {Object} response - Response Object
 */
testRoute = (req, res) => {
  res.json({ msg: "Book section works" });
};

/**
 * Controller to add the new book
 * @name addBook
 * @function
 * @memberof module:book/controller~bookController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
addBook = (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    isbn: req.body.isbn,
    author: req.body.author
  });
  newBook.save(function(err) {
    if (err) {
      return res.status(400).json({ message: "Unable to create new entry" });
    }
    res.status(200).json({ message: "Book added to the records" });
  });
};
 
/**
 * Controller to delete the book using id
 * @name deleteBook
 * @function
 * @memberof module:book/controller~bookController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
deleteBook = (req, res) => {
  Book.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(400).json({ message: "Unable to delete" });

    res.status(200).json({ message: "Deleted successfully" });
  });
};

module.exports = { testRoute, addBook, deleteBook };
