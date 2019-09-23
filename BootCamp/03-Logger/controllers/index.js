const log = require("log4js").getLogger("index");

indexlog = function(req, res) {
  log.debug("This is in the first log module");
  res.send("I am in first log");
};

secondlog = function(req, res) {
  log.debug("This is the second log module");
  res.send("I am in second log");
};

errorlog = function(req, res) {
  log.error("This is the error log module");
  res.error("I am in error log");
};

module.exports = { indexlog, secondlog, errorlog };
