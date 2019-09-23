/** Express router providing user related routes
 * @module user/tests
 */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

const logData = require("../controllers/index");

/**
 * Test  to  check the logging activity of the file.
 * @name Logging
 * @function
 * @inner
 * @param {string} Logging - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Logging to file", () => {
  /**
   * It will enter the data into the app log file
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should enter the data to log", done => {
    let items = logData.indexlog();
    chai
      .request(server)
      .send(items)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.should.have.property("message").eql("I am in first log");
      });
    done();
  });
  /**
   * It will enter the log message to app.log
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should enter the data to log", done => {
    let items = logData.secondlog();
    chai
      .request(server)
      .send(items)
      .get("/log2")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.should.have.property("message").eql("I am in second log");
      });
    done();
  });
  /**
   * It will enter the log data into error log
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should enter the data to log", done => {
    let items = logData.errorlog();
    chai
      .request(server)
      .send(items)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.should.have.property("message").eql("I am in error log");
      });
    done();
  });
});
