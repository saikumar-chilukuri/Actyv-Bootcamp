("use strict");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const should = chai.should();

const users = require("../routes/index");

describe("Logging to file", () => {
  it("it should enter the data to log", done => {
    chai
      .request(server)
      .get("/broken")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
      });
    done();
  });
});
