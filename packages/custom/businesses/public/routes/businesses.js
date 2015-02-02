'use strict';

angular.module('mean.businesses').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('businesses example page', {
      url: '/businesses/example',
      templateUrl: 'businesses/views/index.html'
    })
     .state('businessregistration', {
        url: '/businessregistration',
        templateUrl: 'businesses/views/business-registration.html'     
    });
  }
]);
