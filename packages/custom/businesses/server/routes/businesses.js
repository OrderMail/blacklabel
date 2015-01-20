'use strict';

var businesses = require('../controllers/businesses');

// The Package is past automatically as first parameter
module.exports = function(Businesses, app, auth, database) {

  app.get('/businesses/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/businesses/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/businesses/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/businesses/example/render', function(req, res, next) {
    Businesses.render('index', {
      package: 'businesses'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  app.route('/businesses')
    /*.get(businesses.all)*/
    .post(businesses.create);

};
