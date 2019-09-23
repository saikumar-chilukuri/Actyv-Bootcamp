 /** Express router providing login related routes
 * @module login/tests
 */
const mongoose = require("mongoose");
const Login = require("../models/login");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

const user1 = {
  email = "monday@xyz.com",
  password = "firstday"
};

const user2 = {
  email = "tuesday@mno.com",
  password = "secondday"
};

chai.use(chaiHttp);

/**
 * Runs before all the tests
 * @name before
 * @function
 * @inner
 * @param {callback} middleware - function with done as a param
 */
before(done => {
  Login.create([user1, user2], (err, users) => {
    if (err) return done();

    mongoUser1 = users[0];
    mongoUser2 = users[1];

    done();
  });
});

/**
 * Test to Login the user
 * @name LoginUser
 * @function
 * @inner
 * @param {string} LoginUser - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Login User", () => {
   /**
   * Check login status
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should login new user", done => {
    let user = {
      email: "summer@gmail.com",
      password: "summer123"
    };
    chai
      .request(server)
      .post("/login/user")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.should.have.property("message").eql("Login Successful");
      });
    done();
  });
  /**
   * It will return the err message as not created
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should not login the user", done => {
    chai
      .request(server)
      .post("/login/user")
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Login failed");
      });
    done();
  });
});

/**
 * Test to check the current user
 * @name CurrentUser
 * @function
 * @inner
 * @param {string} CurrentUser - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Current User", () => {
    /**
    * Check the current logged in user
    * @function
    * @inner
    * @param {string} description - string explaining what test should do
    * @param {callback} middleware - function with done as a param
    */
   it("it should return the current user", done => {
    let user = {
        email: "sillicon@gmail.com",
        password: "sillicon123"
      };
     chai
       .request(server)
       .get("/login/current")
       .send(user)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.a("object");
         res.should.have.property("email").eql("sillicon@gmail.com");
       });
     done();
   });
    /**
    * Check current status of user
    * @function
    * @inner
    * @param {string} description - string explaining what test should do
    * @param {callback} middleware - function with done as a param
    */
   it("it should return the current user", done => {
    let user = {
        email: "sillicon@gmail.com",
        password: "sillicon123"
      };
     chai
       .request(server)
       .get("/login/current")
       .send(user)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.a("object");
         res.should.have.property("email").eql("sillicon@gmail.com");
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
