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

before(done => {
  User.create([user1, user2], (err, users) => {
    if (err) return done();

    mongoUser1 = users[0];
    mongoUser2 = users[1];

    done();
  });
});
describe("Creating User", () => {
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

describe("Reading  User", () => {
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

// describe("Update the user", () => {
//   it("it should update the current user", done => {
//     chai
//       .request(server)
//       .put(`/users/update/${user1._id}`)
//       .send({
//         firstName: "martin",
//         lastName: "croog",
//         phone: "121212i1992"
//       })
//       .end((err, res) => {
//         res.body.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("message").eql("User updated");
//         res.body.should.have.property("firstName").eql("martin");
//       });
//     done();
//   });

//   it("it should not update the user", done => {
//     chai
//       .request(server)
//       .put(`/users/update/${user1._id}`)
//       .end((err, res) => {
//         res.body.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("message").eql("User updated");
//         res.body.should.have.property("error").eql("err");
//       });
//     done();
//   });
// });

// describe("Deleting User", () => {
//   it("it should delete the user of id", done => {
//     chai
//       .request(server)
//       .delete(`/users/delete/${user1._id}`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("message").eql("Deleted successfully");
//       });
//     done();
//   });

//   it("it should not delete the user", done => {
//     chai
//       .request(server)
//       .delete(`/users/delete/`)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a("object");
//       });
//     done();
//   });
// });

after(done => {
  User.deleteMany(user1, user2);
  done();
});
