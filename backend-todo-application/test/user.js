const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

var server = require("../index");

var User = require("../models/user");
var Todo = require("../models/todo");

chai.use(chaiHttp);

describe("Todo API", function () {
  it("should Register user, login user, check token and delete a todo on /todo/<id> DELETE", function (done) {
    chai
      .request("http://localhost:5000")

      // register request
      .post("/user/sign-up")

      // send user registration details
      .send({
        name: "Paul Oluyege",
        email: "tester1@gmail.com",
        password: "tester123A#",
      }) // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => {
        // when we get a resonse from the endpoint

        // in other words,
        // the res object should have a status of 201
        res.should.have.status(201);
        // follow up with login
        chai
          .request(server)
          .post("/user/log-in")
          // send user login details
          .send({
            email: "tester1@gmail.com",
            password: "tester123A#",
          })
          .end((err, res) => {
            console.log("this runs the login part");
            res.body.should.have.property("token");
            var token = res.body.token;

            // follow up with requesting user protected page
            chai
              .request(server)
              .get("/todo")
              .end(function (err, res) {
                chai
                  .request(server)
                  .post("/todo")
                  .send({
                    title: "TEST CREATE TODO",
                    description: "testing went fine",
                  })
                  // we set the auth header with our token
                  .set("Authorization", "JWT " + token)
                  .end(function (error, resonse) {
                    resonse.should.have.status(201);
                    resonse.body.should.have.property("message");
                    resonse.body.message.should.equal(
                      
                    
                      "Todo created succesfully"
                    );
                    done();
                  });
              });
          });
      });
  });
});
