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
/*Contact Schema*/
var Contact = new Schema({
title: {
  type:String, 
  required: false
},
phone: {
  type: String,
  required: false
},
// email: {
//     type: String,
//     required: true,
//     // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
//     match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
//   }
// ,
primary: {
  type: Boolean
}
});





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
    },
    
    contacts: [Contact]    
  
 
});

mongoose.model('Business', BusinessSchema);
