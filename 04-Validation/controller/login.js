const express = require("express");
const router = express.Router();

const Login = require("../models/login");

const validateLoginInput = require("../validator/login");

testRoute = (req, res) => {
  res.send("Login Route Works");
};

loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  const newLogin = new Login();
  newLogin.email = email;
  newLogin.password = password;

  newLogin.save(function(err, savedLogin) {
    if (err) {
      res.send
        .status(500)
        .json(err)
        .send("Login failed");
    }
    return res.status(200).send(savedLogin);
  });
};

module.exports = { loginUser, testRoute };
