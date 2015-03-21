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

        console.log('User business_id');
        console.log(user.business_id);        
     
        // Authenticated  
        if(user !== '0') {
          console.log('User logged in............');   
            console.log(user); 
          if(user.business_id === null) {
            console.log('User hasn\'t associated with any business yet');   
            $timeout(deferred.resolve);  
          } else {
            console.log('Redirecting to dashboard');
            $timeout(deferred.reject);
            $location.url('/dashboard');  
          }
        } 
        // Not Authenticated
        else {
          console.log('Redirecting to home page (/)');
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
