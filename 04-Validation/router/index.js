const express = require("express");
const router = express.Router();

const { testRoute, loginUser } = require("../controller/login");

router.get("/test", testRoute);
router.post("/register", loginUser);

module.exports = router;
