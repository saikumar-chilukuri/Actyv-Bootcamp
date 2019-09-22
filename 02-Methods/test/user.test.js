const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
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

let mongoUser1;
let mongoUser2;
chai.use(chaiHttp);

before(done => {
  User.create([user1, user2], (err, users) => {
    if (err) return done();

    mongoUser1 = users[0];
    mongoUser2 = users[1];

    done();
  });
});

///Testing Meathods

describe("Instance Meathods", () => {
  it("it should fetch items similar to docs", done => {
    chai
      .request(server)
      .get("/users/userSearch")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
      });
    done();
  });
  it("it should fetch document based on firstname", done => {
    chai
      .request(server)
      .get("/users/findOneUser")
      .send(mongoUser1)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.should.have.property("firstname").eql("user");
      });
    done();
  });
});
describe("Static Meathods", () => {
  it("it should the documents based on the type", done => {
    chai
      .request(server)
      .get("/users/userStatic")
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});

after(done => {
  User.deleteOne(mongoUser1);
  User.deleteOne(mongoUser2);
  done();
});
