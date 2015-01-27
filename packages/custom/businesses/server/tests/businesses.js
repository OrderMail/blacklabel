'use strict';

var crypto = require('crypto');

/**
 * Create a random hex string of specific length and
 * @todo consider taking out to a common unit testing javascript helper
 * @return string
 */
function getRandomString(len) {
  if (!len)
    len = 16;

  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
}

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Business = mongoose.model('Business');

/**
 * Globals
 */
var business1, business2;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model User:', function() {

  before(function(done) {
      business1 = {
         category: 'category',
          website: getRandomString(),
          businessname: getRandomString(),

         addresses: [{
            addressline1: 'addressline1',
            addressline2: 'addressline2',
            city: 'city',
            state: 'state',
            country: 'country'
           }] 
      };

      business2 = {
         category: 'category',
          website: getRandomString(),
          businessname: getRandomString(),

         addresses: [{
            addressline1: 'addressline1',
            addressline2: 'addressline2',
            city: 'city',
            state: 'state',
            country: 'country'
           }] 
      };

      done();
    });

  });
});
