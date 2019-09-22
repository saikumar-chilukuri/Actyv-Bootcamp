const mongoose = require("mongoose");
require("dotenv").config();
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
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

//------Encrypting the password using Bcrypt-js-------//
LoginSchema.pre("save", function(next) {
  var login = this;
  bcrypt.hash(login.password, process.env.SALT, (err, hash) => {
    if (err) return next(err);
    login.password = hash;
    next();
  });
});

//----User Defined Instance mongoose Method--------//
LoginSchema.methods.isValidPassword = async function(password) {
  const login = this;
  const compare = await bcrypt.compare(password, login.password);
  return compare;
};

module.exports = Login = mongoose.model("login", LoginSchema);
