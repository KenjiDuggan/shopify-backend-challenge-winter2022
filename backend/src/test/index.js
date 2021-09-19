const express = require('express')

describe('Shopify Backend Winter2022', function() {
    var app,
        date;
  
    // Timeout for tests that take time
    this.timeout(5000);
  
    // Called once before any of the tests in this block begin.
    before(function(done) {
      app = express()
      // Any asynchronous action with a callback.
      app.listen(3001, function(err) {
        if (err) { return done(err); }
        done();
      })
    })

  // Called once before each of the tests in this block.
  beforeEach(function() {
    date = new Date();
  });

  // Called after all of the tests in this block complete.
  after(function() {
    console.log("Our applicationa tests done!");
  });

  // Called once after each of the tests in this block.
  afterEach(function() {
    console.log("The date for that one was", date);
  });
 
});