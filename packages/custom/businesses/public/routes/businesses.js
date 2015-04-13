'use strict';

angular.module('mean.businesses').config(['$stateProvider', 
  function($stateProvider) {

// Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {

      // Initialize a new promise
      var deferred = $q.defer();
      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {

        console.log('User business_id');
        console.log(user.business_id);        
      
        // Authenticated  
        if((user !== '0') && (user.business_id === null)) {
        /*if((user !== '0') && (typeof user.business_id === 'undefined')) {*/
          console.log('User logged in............');   
          $timeout(deferred.resolve);
        } 
        // Not Authenticated
        else {
          console.log('Redirecting to home page (/)');
          $timeout(deferred.reject);
          $location.url('/dashboard');
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
