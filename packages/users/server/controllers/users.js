'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  async = require('async'),
  //config = require('meanio').loadConfig(),
  crypto = require('crypto'),
  nodemailer = require('nodemailer'),
  templates = require('../template');


// Naveen code for email, 16/12/2014
  var nodemailer = require('nodemailer');
  var smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
      user: 'omail.noreply@gmail.com',
      pass: 'vikas123456'
      },

});


/**
 * Sending email
 */
function sendMail(req, res, mailOptions) {
  smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                console.log('mail not sent : '+error);
                res.end('error');
                }else{
                console.log('Message sent: ' + response.message);
                res.end('sent');
                }
                });
}


/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.redirect('#!/login');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
  res.redirect('/');
};



/**
 * Create user
 */
exports.create = function(req, res, next) {
  var user = new User(req.body);

  user.provider = 'local';

  // because we set our user.provider to local our models/user.js validation will always be true
  
  req.assert('firstname', 'You must enter a firstname').notEmpty();
  req.assert('email', 'You must enter a valid email address').isEmail();
  req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);  
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);  
  req.assert('businessname', 'You must enter a business name').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  // Hard coded for now. Will address this with the user permissions system in v0.3.5
  user.roles = ['authenticated'];
  user.save(function(err) {
  
    if (err) {
      switch (err.code) {
        case 11000:
        case 11001:
          res.status(400).send([{
            msg: 'Business name already taken',
            param: 'businessname'       
          }]);
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
      }
      console.log('checkpoint 1');
      return res.status(400);
    }
    console.log('checkpoint 2');
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');        
    });

                // Naveen code for email, 16/12/2014
                console.log('checkpoint 3');
                var mailOptions={
                to : user.email
                };
                mailOptions = templates.signup_email(user,mailOptions);
                sendMail(req, res, mailOptions);


    res.status(200);
  });
};


/**
 * Send User
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
  User
    .findOne({
      _id: id
    })
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};

/**
 * Resets the password
 */

exports.resetpassword = function(req, res, next) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function(err, user) {
    if (err) {
      return res.status(400).json({
        msg: err
      });
    }
    if (!user) {
      return res.status(400).json({
        msg: 'Token invalid or expired'
      });
    }
    req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
      return res.status(400).send(errors);
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save(function(err) {
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.send({
          user: user,
        });
      });
    });
  });
};


/**
 * Callback for forgot password link
 */
exports.forgotpassword = function(req, res, next) {
  async.waterfall([

      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          console.log('check 1');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({
          $or: [{
            email: req.body.text
          }, {
            username: req.body.text
          }]
        }, function(err, user) {
          if (err || !user) return done(true);
          done(err, user, token);
        });
      },

      function(token, user, done) {
        var mailOptions = {
          to: req.body.text
        };
        mailOptions = templates.forgot_password_email(user, mailOptions);
        sendMail(req, res, mailOptions);
        done(null, true);         // Why it is here ?
        
      }

      /*function(user, token, done) {
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      },
      function(token, user, done) {
        var mailOptions = {
          to: user.email,
          from: config.emailFrom
        };
        mailOptions = templates.forgot_password_email(user, req, token, mailOptions);
        sendMail(mailOptions);
        done(null, true);
      }*/
    ],
    function(err, status) {
      var response = {
        message: 'Mail successfully sent',
        status: 'success'
      };
      if (err) {
        response.message = 'Email does not exist';
        response.status = 'danger';
      }
      res.json(response);
    }
  );
};
