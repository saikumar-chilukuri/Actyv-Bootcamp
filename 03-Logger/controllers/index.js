module.exports.indexlog = function(req, res) {
  log.debug("This is in the first log module");
  res.send("I am in first log");
};

module.exports.secondlog = function(req, res) {
  log.debug("This is the second log module");
  res.send("I am in second log");
};

module.exports.errorlog = function(req, res) {
  log.error("This is the error log module");
  res.error("I am in error log");
};
