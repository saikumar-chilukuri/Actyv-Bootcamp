/** User Controller
 * @module user/controller
 */

/**
 * @namespace userController
 */

/**
 * Mongoose Model for User.
 * @const
 */
const User = require("../models/user");

/**
 * Controller to check the fucntioning of route
 * @name testRoute
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - NULL
 * @param {Object} response - Response Object
 */
testRoute = (req, res) => {
  res.json({ msg: "User works" });
};

/**
 * Controller to handle the new user
 * @name createUser
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
createUser = (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone
  });
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).json({ message: "Unable to create user" });
    }
    res.status(200).json({ message: "User created" });
  });
};
/**
 * Controller to read the user documents based on id
 * @name readUser
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
readUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(404).json({ message: "Cannot read the user" });
    res.status(200).json(user);
  });
};
/**
 * Controller to update the user details
 * @name updateUser
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
updataeUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) return res.status(400).json({ message: "Update failed" });
    res.status(200).json({ message: "User updated" });
  });
};

/**
 * Controller to delete the user using id
 * @name deleteUser
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) return res.status(400).json({ message: "Unable to delete" });

    res.status(200).json({ message: "Deleted successfully" });
  });
};

module.exports = { testRoute, createUser, updataeUser, readUser, deleteUser };
