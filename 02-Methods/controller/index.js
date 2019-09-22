const User = require("../models/user");

testRoute = (req, res) => {
  res.json({ msg: "User works" });
};

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

//Mongoose meahods
userSearch = (req, res) => {
  User.find(function(err, docs) {
    res.send(docs);
  }).sort({ lastname: "asc" });
};
oneUser = (req, res) => {
  User.findOne({ firstname: "oscar" }, function(err, docs) {
    if (err) return err;
    res.send(docs);
  });
};

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
