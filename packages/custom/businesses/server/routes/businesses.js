'use strict';

var businesses = require('../controllers/businesses');

// The Package is past automatically as first parameter
module.exports = function(Businesses, app, auth, database) {


  app.route('/businesses')
    .get(businesses.all)
    .post(businesses.create);

  /*app.route('/businesses/:businessId')
    .get(auth.requiresLogin, hasAuthorization, businesses.show);*/

};
