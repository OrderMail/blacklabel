'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Rfi = mongoose.model('Rfi');
 /* _ = require('lodash');*/



/**
 * Create an article
 */
exports.create = function(req, res) {
  console.log('came in servr cont');
  var rfi = new Rfi(req.body);
  console.log('run 1  '+rfi);
  rfi.user = req.user;
  console.log('run 2');
  /*rfi.save(function(err) {
    if (err) {
      console.log('problem '+err);
      return res.json(500, {
        error: 'Cannot save RFi'
      });
    }
    console.log('run 4');
    res.json(rfi);

  });*/
};



