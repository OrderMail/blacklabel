'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
* Check uniqueness of website
*/
var validateUniqueWebsite = function(value, callback) {
  console.log('value : '+ value);  
  var Business = mongoose.model('Business');
  Business.find({
    $and: [{
      website: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, business) {
    callback(err || business.length === 0);
  });
};

/**
* Check uniqueness of website
*/
var validateUniqueBusinessname = function(value, callback) {
  console.log('value : '+ value);  
  var Business = mongoose.model('Business');
  Business.find({
    $and: [{
      website: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, business) {
    callback(err || business.length === 0);
  });
};

/**
 * Business Schema
 */
var BusinessSchema = new Schema({

  businessname: {
    type: String,
    unique: true,
    required: true,
    validate: [validateUniqueBusinessname, 'Business name already taken']
  },
 
 addresses : {
  type: Array
 },
 
 /* addresses: {
    addressline1:  {
      type: String,
      required: true
    },
    addressline2:  {
      type: String,
    },
    city:  {
      type: String,    
      required: true
    },
    state:  {
      type: String,
      required: true
    },
    country:  {
      type: String,
      required: true
    }    
  },
*/
  category: {
    type: String,
    required: true
  },
  
  website: {
    type: String,
    unique: true,
    required: true,
    validate: [validateUniqueWebsite, 'Website already taken']
  }
});

mongoose.model('Business', BusinessSchema);
