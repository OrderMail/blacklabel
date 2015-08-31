'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Rfi = new Module('rfi');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Rfi.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Rfi.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Rfi.menus.add({
    title: 'rfi example page',
    link: 'rfi example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Rfi.aggregateAsset('css', 'rfi.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Rfi.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Rfi.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Rfi.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Rfi;
});
