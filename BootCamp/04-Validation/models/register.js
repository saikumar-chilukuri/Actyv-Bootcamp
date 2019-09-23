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
const regiseterSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Register = mongoose.model("register", regiseterSchema);

/**
 * @typedef {Object} RegisterSchema
 * @property {String} firstname -  firstname  of User
 * @property {String} lastname - lastname of the user
 * @property {String} email - email id of the user
 */
