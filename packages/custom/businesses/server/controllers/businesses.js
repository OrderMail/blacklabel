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

     /*  if (err) {
      switch (err.code) {
        case 11000:
        case 11001:
          res.status(400).send([{
            msg: 'Business name already taken',
            param: 'businessname'       
          }]);
          console.log('Inside error');
          break;
        default:
          var modelErrors = [];

          if (err.errors) {

            for (var x in err.errors) {
              modelErrors.push({
                param: x,
                msg: err.errors[x].message,
                value: err.errors[x].value
              });
            }

            res.status(400).send(modelErrors);
          }
          console.log('modelErrors : '+ modelErrors); 
      }           
      return res.status(400);
    }*/

    /*if (11000 === err.code || 11001 === err.code) {
      res.status(400).send([{
            msg: 'Business name alreday in DB',
            param: 'businessname'       
          }]);
    }*/
    res.json(business);

  });
};