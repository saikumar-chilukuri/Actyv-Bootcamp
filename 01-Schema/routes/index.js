const express = require("express");
const router = express.Router();

const {
  testRoute,
  createUser,
  readUser,
  updataeUser,
  deleteUser
} = require("../controller/index");

router.get("/test", testRoute);
router.post("/create", createUser);
router.get("/read/:id", readUser);
router.put("/update/:id", updataeUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
