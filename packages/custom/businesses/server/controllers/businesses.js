'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'), 
  Business = mongoose.model('Business'),
  User = mongoose.model('User');

  exports.create = function(req, res) {
    var business = new Business(req.body);    

    business.user = req.user;
    console.log('Business Name : '+business.businessname);  

    console.log('User : '+business.user);    

    var response  = {  
      msg: business.businessname+' has been sucessfully registered on Blacklabel!',
      status: 'success'
    };

    business.save(function(err) {    
      if (err) {
        console.log('Error at Node : '+err);
        switch (err.code) {
          case 11000:
          case 11001:
          {
            response.msg= 'Business name has already registered.';
            response.status= 'failure';
          }
          break;
          default:            
          {
            response.msg= 'Unable to save business';
            response.status= 'failure';
          }       
        }  
        return res.json(response);      
      }    
    
      console.log('Recently created business   ------- '+business);  

      User.findOne({ '_id': business.user}, function (err, user){
        if(err) {
            response.msg= 'Unable to update user while registering business';
            response.status= 'failure';
        } else {          
          user.business_id = business._id;        
          user.save();
          console.log('User object after update  -- '+user);  
        }        
      });

      return res.json(response);    
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