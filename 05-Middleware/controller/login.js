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
  res.send("user works");
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

  // Find user by email
  Login.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

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
        return res.status(400).json(errors);
      }
    });
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
        name: req.user.name,
        email: req.user.email
      });
    };
};

module.exports = { currentUser, testRoute, loginUser };
