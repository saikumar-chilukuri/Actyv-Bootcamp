/** Login Controller
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
const keys = require("../dbconfig/config");
const validateLoginInput = require("../validator/login");
const bcrypt = require("bcryptjs");

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
  res.json({ message: "Login Route Works" });
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
  /**
   * Validating login
   * @name validateLoginInput
   * @function
   * @memberof module:login/schema~loginUser
   * @inner
   * @param {callback} middleware - Middleware with email, password
   * @returns {Boolean} If login is valid or not.
   */
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  let payload = { email, password };
  res.status(200).json({ message: "Login Successful" });
};

module.exports = { loginUser, testRoute };
