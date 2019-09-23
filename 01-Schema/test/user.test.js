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
  firstName: "user",
  lastName: "1",
  phone: "1234567899"
};

const user2 = {
  firstName: "user",
  lastName: "2",
  phone: "1234567890"
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
  User.create([user1, user2], (err, users) => {
    if (err) return done();

    mongoUser1 = users[0];
    mongoUser2 = users[1];

    done();
  });
});

/**
 * Test  to  create the user with params
 * @name CreateUser
 * @function
 * @inner
 * @param {string} CreateUser - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Creating User", () => {
  /**
   * It will return the success on creating new user
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should create the new user", done => {
    let user = {
      firstname: "user1",
      lastname: "last",
      phone: "9876543210"
    };
    chai
      .request(server)
      .post("/users/create")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
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
  it("it should not create the new user", done => {
    chai
      .request(server)
      .post("/users/create")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        // res.body.should.have.property("message").eql("Unable to create user");
      });
    done();
  });
});

/**
 * Test to Read the user details from the database
 * @name ReadUser
 * @function
 * @inner
 * @param {string} ReadUser - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Reading  User", () => {
  /**
   * It will return the status as success.
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should read the user from database", done => {
    chai
      .request(server)
      .get(`/users/read/${user1._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("user read successfully");
      });
    done();
  });
  /**
   * It will not return the true flag for reading data
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should not read the user", done => {
    // let dumb = {
    //   id = "8765432"
    // }
    chai
      .request(server)
      .get(`/users/read/${dumb._id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Cannot read the user");
      });
    done();
  });
});

/**
 * Test to Update the existing user
 * @name UpdateUser
 * @function
 * @inner
 * @param {string} UpdateUser - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Update the user", () => {
  /**
   * It will return success on the update
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should update the current user", done => {
    chai
      .request(server)
      .put(`/users/update/${user1._id}`)
      .send({
        firstName: "martin",
        lastName: "croog",
        phone: "121212i1992"
      })
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User updated");
        res.body.should.have.property("firstName").eql("martin");
      });
    done();
  });
  /**
   * It will return the nessage as not updated
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */

  it("it should not update the user", done => {
    chai
      .request(server)
      .put(`/users/update/${user1._id}`)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User not updated");
        res.body.should.have.property("error").eql("err");
      });
    done();
  });
});

/**
 * Test to delete the user document from the database
 * @name DeleteUser
 * @function
 * @inner
 * @param {string} DeleteUser - Name of test group
 * @param {callback} middleware - function with done as a param
 */
describe("Deleting User", () => {
  /**
   * It will return the success response
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should delete the user of id", done => {
    chai
      .request(server)
      .delete(`/users/delete/${user1._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Deleted successfully");
      });
    done();
  });

  /**
   * It will return error while deleting the user
   * @function
   * @inner
   * @param {string} description - string explaining what test should do
   * @param {callback} middleware - function with done as a param
   */
  it("it should not delete the user", done => {
    chai
      .request(server)
      .delete(`/users/delete/${mongoUser2._id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
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
