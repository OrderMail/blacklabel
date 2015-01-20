'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Business Schema
 */
var BusinessSchema = new Schema({

  businessname: {
    type: String,
    unique: true,
    required: true
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
    required: true
  }
});

mongoose.model('Business', BusinessSchema);
