/** Register Controller
 * @module register/controller
 */

/**
 * @namespace registerController
 */

/**
 * Mongoose Model for Register.
 * @const
 */
const Register = require("../models/register");


/**
 * Validate register parameters
 *@const
 */
const validateRegisterInput = require("../validator/register");



/**
 * Controller to check the fucntioning of route
 * @name testRoute
 * @function
 * @memberof module:register/controller~registerController
 * @inner
 * @param {Object} request - NULL
 * @param {Object} response - Response Object
 */
testRoute = (req, res) => res.json({ msg: "Register section Works" });



/**
 * Controller to register the user
 * @name register
 * @function
 * @memberof module:register/controller~registerController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
registerUser = (req, res) => {

  /**
   * Validating Registration
   * @name validateLoginInput
   * @function
   * @memberof module:register/schema~registerUser
   * @inner
   * @param {callback} middleware - Middleware to check all required fields
   * @returns {Boolean} If registration is valid
   */
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Register.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      });

      res.status(200).json({ message: "User Registered" });
    }
  });
};

module.exports = { testRoute, registerUser };
