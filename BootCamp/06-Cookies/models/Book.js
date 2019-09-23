/**
 * Mongoose driver for MongoDb
 * @const
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Mongoose Schema
 * @const
 */
const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    required: true
  },
  author: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model("books", BookSchema);

/**
 * @typedef {Object} BookSchema
 * @property {String} name - Name of the Book
 * @property {String} isbn - Isbn number of Book
 * @property {String} author - Name of author
 * @property {String} date -  Date of record Entry.
 */
