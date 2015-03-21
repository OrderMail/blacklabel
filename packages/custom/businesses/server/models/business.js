'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
* Check uniqueness of website
*/
/*var validateUniqueBusinessname = function(value, callback) {
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
};*/

/**
 * Business Schema
 */
var BusinessSchema = new Schema({

  businessname: {
    type: String,
    unique: true,
    required: true
    /*validate: [validateUniqueBusinessname, 'Business name already taken']*/
  },
 
  addresses : {
    type: Array
  },
 
  category: {
    type: String,
    required: true
  },
  
  website: {
    type: String    
  },

  createdOn: {
    type: Date,
    default: Date.now
  },
  
  updatedOn: {
    type: Date,
    default: Date.now
  },

  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
 
});

mongoose.model('Business', BusinessSchema);
