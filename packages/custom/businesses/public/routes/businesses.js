'use strict';

angular.module('mean.businesses').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('businessregistration', {
        url: '/businessregistration',
        templateUrl: 'businesses/views/business-registration.html'     
    })
     .state('businesses', {
        url: '/businesses',
/*        templateUrl: 'businesses/views/business-registration.html'     
*/    });
  }
]);
