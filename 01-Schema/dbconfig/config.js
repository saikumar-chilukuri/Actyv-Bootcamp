const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  mongoURI: process.env.mongoURI,
  secret: process.env.SECRET
};
