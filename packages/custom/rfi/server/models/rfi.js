'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var RfiSchema = new Schema({
  /*created: {
    type: Date,
    default: Date.now
  },*/
  to:{
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    default: 'Request For Info',
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  mailingaddress: {
    type: String,
    trim: true
  },
  shipTo: {
    type: String,
    trim: true
  },
  rfiDate: {
    type: String,
    trim: true
  },
  rfiDueDate: {
    type: String,
    trim: true
  },
  shipingAddress: {
    type: String,
    trim: true
  },
  shipVia: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    trim: true
  },
  approvedBy: {
    type: String,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
/*ArticleSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

ArticleSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');*/

/**
 * Statics
 */
RfiSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Rfi', RfiSchema);
