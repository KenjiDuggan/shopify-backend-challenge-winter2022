// Env Variables
require('dotenv').config({ path: 'src/.env' }) 

// Import libraries
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
var mongoose = require('mongoose')

// Import server
var server = require('../index')

// Import User Model
var User = require('../models/User')

// Use chaiHttp for making the actual HTTP requests        
chai.use(chaiHttp)

console.log(process.env.ADMIN_AWS_ACCESS_KEY)

describe('S3 Image API', function() {
    it('Should Register User, Login User, Check Token', function(done) {
        chai.request(server)

            // register request
            .post('/user/register')

            // send user registration details
            .send({
                  'name': 'testerUser',
                  'email': 'tester@gmail.com',
                  'password': 'tester',
                  'iam_access_key': process.env.ADMIN_AWS_ACCESS_KEY,
                  'iam_secret_key': process.env.ADMIN_AWS_SECRET_KEY
                }) // this is like sending $http.post or this.http.post in Angular
            .end((err, res) => { // when we get a resonse from the endpoint
                // in other words,
                // the res object should have a status of 201
                res.should.have.status(201)

                // follow up with login
                chai.request(server)
                    .post('/user/login')
                    // send user login details
                    .send({
                        'email': 'tester@gmail.com',
                        'password': 'tester'
                    })
                    .end((err, res) => {
                        res.body.should.have.property('token')
                        const token = res.body.token
                       
                        // follow up with requesting user protected page to get userdata
                        chai.request(server)
                          .get('/user/me')
                          .set('Authorization', 'JWT ' + token)

                        chai.request(server) 
                          .get('/images/public')
                          .set('Authorization', 'JWT ' + token)
                          .end(function(err, res) {
                            console.log('res: ' + JSON.stringify(res))
                          })

                        chai.request(server) 
                          .get('/images/private')
                          .set('Authorization', 'JWT ' + token)
                          .end(function(err, res) {
                            console.log('res: ' + JSON.stringify(res))
                          })
                    })

                    done()
            })
    })
})