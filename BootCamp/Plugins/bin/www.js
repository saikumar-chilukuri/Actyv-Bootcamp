#!/usr/bin/env node
const app = require("../index");
const pkg = require("../package.json.js");
require("dotenv").config();

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () => {
  console.log(pkg.name, "listening on port ", server.address().port);
});
