'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Business = mongoose.model('Business');
  //_ = require('lodash');



/**
 * Create a business
 */
exports.create = function(req, res) {
  var business = new Business(req.body);
  business.user = req.user;
 
  console.log('Business Name : '+ business.businessname);

  business.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the business'
      });
    }

    /*if (11000 === err.code || 11001 === err.code) {
      res.status(400).send([{
            msg: 'Business name alreday in DB',
            param: 'businessname'       
          }]);
    }*/
    res.json(business);

  });
};