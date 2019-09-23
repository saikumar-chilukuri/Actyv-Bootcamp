/** Express router providing user related routes
 * @module user/tests
 */
const mongoose = require("mongoose");
const User = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

const user1 = {
  firstname: "oscar",
  lastname: "rider",
  phone: "1234567899"
};

const user2 = {
  firstname: "table",
  lastname: "ball",
  phone: "1234567890"
};
let mongoUser1;
let mongoUser2;
chai.use(chaiHttp);

/**
 * Runs before all the tests
 * @name before
 * @function
 * @inner
 * @param {callback} middleware - function with done as a param
 */
before(done => {
  User.create([user1, user2], (err, users) => {
    mongoUser1 = users[0];
    mongoUser2 = users[1];
    done();
  });
});

/**
 * Test  to  implement mongoose methods
 * @name InstanceMethods
 * @function
 * @inner
 * @param {string} InstanceMethods - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Instance Methods", () => {
  /**
   * It will fetch the documents from the database
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should fetch items similar to docs", done => {
    chai
      .request(server)
      .get("/users/search")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
    done();
  });
  /**
   * It will return the document based on firstname
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should fetch document based on firstname", done => {
    chai
      .request(server)
      .get("/users/find/one")
      .send(mongoUser1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("firstname").eql("oscar");
      });
    done();
  });
});

/**
 * Test  to  implement mongoose static methods
 * @name StaticMethods
 * @function
 * @inner
 * @param {string} StaticMethods - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Static Methods", () => {
  /**
   * It will return the document based on the similar type
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should get documents based on the type", done => {
    var user = new User({
      firstname: "james",
      lastname: "foster",
      phone: "9876543667"
    });
    chai
      .request(server)
      .get("/users/static")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});
/**
 * Runs after all the tests
 * @name after
 * @function
 * @inner
 * @param {callback} middleware - function with done as a param
 */
after(done => {
  User.deleteOne(mongoUser1);
  User.deleteOne(mongoUser2);
  done();
});
