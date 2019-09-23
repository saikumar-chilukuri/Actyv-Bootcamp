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
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

/**
 * User defined Instance Mongoose Meathod
 * @name findByType
 * @function
 * @memberof user/schema~userSchema
 * @inner
 * @param {callback} - User with similar documnet fields
 * @returns {Boolean} Return data or null.
 */
UserSchema.methods.findByType = function(cb) {
  return this.model("users").find({ type: this.type }, cb);
};

module.exports = User = mongoose.model("users", UserSchema);

/**
 * @typedef {Object} UserSchema
 * @property {String} firstName - First Name of User
 * @property {String} lastName - Last Name of User
 * @property {String} Phone - Phone number of the user
 * @property {String} date -  Date of record Entry.
 */
