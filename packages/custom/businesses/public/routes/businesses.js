'use strict';

angular.module('mean.businesses').config(['$stateProvider', 
  function($stateProvider) {

// Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {

    	console.log('checkLoggedin ');

      // Initialize a new promise
      var deferred = $q.defer();
      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        console.log('User logged in : '+user);
        
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/');
        }
      });

      return deferred.promise;
    };


    $stateProvider.state('businessregistration', {
        url: '/businessregistration',
        templateUrl: 'businesses/views/business-registration.html',   
        resolve: {
          loggedin: checkLoggedin
        } 
    })
     .state('businesses', {
        url: '/businesses',
/*        templateUrl: 'businesses/views/business-registration.html'     
*/    });
  }
]);
