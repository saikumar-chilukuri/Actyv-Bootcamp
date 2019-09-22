const express = require("express");
const router = express.Router();

// Load User Schema model
const User = require("../models/user");

testRoute = (req, res) => {
  res.json({ msg: "User works" });
};

//@DESC CRUD OPERATIONS //CREATE-READ-UPDATE-DELETE ///
createUser = (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone
  });
  newUser.save(function(err) {
    if (err) {
      return res.status(400).json({ msg: "Unable to create user" });
    }
    res.status(200).json(newUser);
  });
};

readUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(404).json({ msg: "Cannot read the user" });
    res.status(200).send("user read successfully");
  });
};

updataeUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) return res.status(400).json(err);
    res.status(200).send("user updated successfully");
  });
};

deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(400).json(err);

    res.status(200).send("Deleted successfully!");
  });
};

module.exports = { testRoute, createUser, updataeUser, readUser, deleteUser };
