'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Business = mongoose.model('Business');
  //_ = require('lodash');


exports.create = function(req, res) {
  var business = new Business(req.body);
  business.user = req.user;
  console.log('Business Name : '+business.businessname);  
  console.log('User Name : '+business.user);  

  var response  = {  
    msg: business.businessname+' has been sucessfully registered on Blacklabel!',
    status: 'successfull'
  };
  business.save(function(err) {    
    if (err) {
      switch (err.code) {
        case 11000:
        case 11001:
        {
          response.msg= 'Business name already taken';
          response.status= 'failure';
        }
        break;
        default:            
        {
          response.msg= 'Unable to save business';
          response.status= 'failure';
        }
        return res.json(response);
      }   
    }
    res.json(response);
  });

};
exports.all = function(req, res) {
  /*var currentuser = {
     user: req.user
  };*/
 // res.json('It is wrong');
  Business.find().exec(function(err, businesses) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the businesses'
      });
    }
    res.json(businesses);
  });
};
