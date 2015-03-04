'use strict';

//Setting up route
angular.module('mean.users').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is not connected
    var checkLoggedOut = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') {
          $timeout(deferred.reject);
          $location.url('/login');
        }

        // Not Authenticated
        else $timeout(deferred.resolve);
      });

      return deferred.promise;
    };
   /* var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/');
        }
      });

      return deferred.promise;
    };*/



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
          if(user.business_id === null) {
            console.log('User hasn\'t associated with any business yet');               
            $timeout(deferred.reject);
            $location.url('/businessregistration');
          } else {
            console.log('Redirecting to dashboard');            
            $timeout(deferred.resolve);  
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

    // states for my app
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'users/views/index.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'users/views/login.html',
        resolve: {
          loggedin: checkLoggedOut
        }
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: 'users/views/register.html',
        /*resolve: {
          loggedin: checkLoggedOut
        }*/
      })
      .state('forgot-password', {
        url: '/forgot-password',
        templateUrl: 'users/views/forgot-password.html',
        resolve: {
          loggedin: checkLoggedOut
        }
      })
      .state('reset-password', {
        url: '/reset/:tokenId',
        templateUrl: 'users/views/reset-password.html',
        resolve: {
          loggedin: checkLoggedOut
        }
      })
      .state('auth.businessregistration', {
        url: '/businessregistration',
        templateUrl: 'users/views/business-registration.html',        
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'users/views/dashboard.html',    
        resolve: {
          loggedin: checkLoggedin
        }    
      });
  }
]);
