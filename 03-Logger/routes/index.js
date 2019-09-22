var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("index");

/* GET home page. */
router.get("/", function(req, res) {
  log.debug("This is in the first log module");
  res.send("I am in first log");
});

router.get("/log2", function(req, res) {
  log.debug("This is the second log module");
  res.send("I am in second log");
});

/* GET something that just errors */
router.get("/log/error", function(req, res) {
  log.error("This is the error log module");
  res.error("I am in error log");
});

module.exports = router;
