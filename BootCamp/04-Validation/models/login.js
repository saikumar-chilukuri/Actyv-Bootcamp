/**
 * Mongoose driver for MongoDb
 * @const
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Importing of the .env configurations.
 */
require("dotenv").config();
/**
 * A library to hash tthe password.
 * @const
 */
const bcrypt = require("bcryptjs");

/**
 * Mongoose Schema 
 * @const
 */
const LoginSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * Pre Middleware hook for save
 * @name pre
 * @function
 * @memberof module:login/schema~loginSchema
 * @inner
 * @param {callback} middleware - Middleware with next as a param
 */

LoginSchema.pre("save", function(next) {
  var login = this;
  /**
   * Function to hash the password.
   * @function
   * @inner
   * @param {string} password - New Password
   * @param {int} salt - Bcrypt Salt Rounds
   * @param {callback} middleware - Returns a hash for the password
   * @returns {String } Encrypts or Hash the password.
   */
  bcrypt.hash(login.password, process.env.SALT, (err, hash) => {
    if (err) return next(err);
    login.password = hash;
    next();
  });
});



module.exports = Login = mongoose.model("login", LoginSchema);

/**
 * @typedef {Object} LoginSchema
 * @property {String} email -  email address  of User
 * @property {String} password - Password of the user
 */
