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
