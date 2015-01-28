'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Runs = new Module('runs');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Runs.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Runs.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Runs.menus.add({
    'roles': [],
    'title': 'View Runs',
    'link': 'all runs'
  });
  Runs.menus.add({
    'roles': ['admin'],
    'title': 'Create New Run',
    'link': 'create run'
  });
  
  Runs.aggregateAsset('css', 'runs.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Runs.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Runs.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Runs.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Runs;
});
