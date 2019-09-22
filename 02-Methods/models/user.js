const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

UserSchema.methods.findByType = function(cb) {
  return this.model("users").find({ type: this.type }, cb);
};

module.exports = User = mongoose.model("users", UserSchema);
