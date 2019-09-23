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
  newUser.save(function(err) {
    if (err) {
      return res.status(400).json({ msg: "Unable to create user" });
    }
    res.status(200).json(newUser);
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
    if (err) return res.status(404).json({ msg: "Cannot read the user" });
    res.status(200).send("user read successfully");
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
    if (err) return res.status(400).json(err);
    res.status(200).send("user updated successfully");
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
    if (err) return res.status(400).json(err);

    res.status(200).send("Deleted successfully!");
  });
};

/**
 * Controller to search the users in documents
 * @name userSearch
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - NULL
 * @param {Object} response - Response Object
 */
userSearch = (req, res) => {
  User.find(function(err, docs) {
    res.send(docs);
  }).sort({ lastname: "asc" });
};

/**
 * Controller to find similar type of user
 * @name userStatic
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
userStatic = (req, res) => {
  var newUser = new User({
    firstname: "james",
    lastname: "foster",
    phone: "9876543667"
  });

  newUser.findByType(function(err, users) {
    res.send(users);
  });
};
/**
 * Controller to find user based on params
 * @name oneUser
 * @function
 * @memberof module:user/controller~userController
 * @inner
 * @param {Object} request - Request Object
 * @param {Object} response - Response Object
 */
oneUser = (req, res) => {
  User.findOne({ firstname: "oscar" }, function(err, docs) {
    if (err) return err;
    res.json(docs);
  });
};

module.exports = {
  testRoute,
  createUser,
  updataeUser,
  readUser,
  deleteUser,
  userSearch,
  userStatic,
  oneUser
};
