/** User Controller
 * @module login/controller
 */

/**
 * @namespace loginController
 */

/**
 * Mongoose Model for Login.
 * @const
 */

const Login = require("../models/login");
/**
 * A library to hash tthe password.
 * @const
 */
const bcrypt = require("bcryptjs");

/**
 * An implementation of JSON Web Tokens in Node.JS.
 * @const
 */
const jwt = require("jsonwebtoken");
/**
 * Importing the mongoDB configuration
 * @const
 */
const keys = require("../dbconfig/config");

const passport = require("passport");

const validateLoginInput = require("../validator/login");

/**
 * Controller to check the fucntioning of route
 * @name testRoute
 * @function
 * @memberof module:login/controller~loginController
 * @inner
 * @param {Object} request - NULL
 * @param {Object} response - Response Object
 */
testRoute = (req, res) => {
  res.send("Login Route Works");
};

/**
 * Controller to create login session
 * @name loginUser
 * @function
 * @memberof module:login/controller~loginController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newLogin = new Login({
    email: req.body.email,
    password: req.body.password
  });

  newLogin.save(function(err, res) {
    if (err) res.status(500).json(errors);
    return res.status(200).json({ message: "User logged in" });
  });

  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      const payload = { id: user.id, name: user.name };

      jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    } else {
      errors.password = "Password incorrect";
      console.log(errors);
      return res.status(400).json({ msg: "Errors" });
    }
  });
};

/**
 * Controller to fetch the deatils of current session
 * @name currentUser
 * @function
 * @memberof module:login/controller~loginController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
currentUser = () => {
  passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        email: req.user.email,
        password: req.user.password
      });
    };
};

module.exports = { currentUser, testRoute, loginUser };
