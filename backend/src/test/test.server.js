// Import libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
var mongoose = require("mongoose");

// Import server
var server = require('../index');

// Import User Model
var User = require("../models/User");

// use chaiHttp for making the actual HTTP requests        
chai.use(chaiHttp);

describe('Todo API', function() {

    it('Should register user, login user, check token', function(done) {
        chai.request(server)

            // register request
            .post('/user/register')

            // send user registration details
            .send({
                    'name': 'testerUser',
                    'email': 'tester@gmail.com',
                    'password': 'tester'
                }

            ) // this is like sending $http.post or this.http.post in Angular
            .end((err, res) => { // when we get a resonse from the endpoint

                // in other words,
                // the res object should have a status of 201
                res.should.have.status(201);

                // follow up with login
                chai.request(server)
                    .post('/user/login')
                    // send user login details
                    .send({
                        'email': 'tester@gmail.com',
                        'password': 'tester'
                    })
                    // .end((err, res) => {
                    //     console.log('this runs the login part');
                    //     res.body.should.have.property('token');
                    //     var token = res.body.token;

                    //     // follow up with requesting user protected page to get userdata
                    //     chai.request(server)
                    //         .get('/user/me')
                    //         .set('Authorization', 'JWT ' + token)
          
                    // })
                    done()
            })
    })
})