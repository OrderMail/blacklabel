'use strict';

angular.module('mean.rfi').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('rfi example page', {
      url: '/rfi/example',
      templateUrl: 'rfi/views/index.html'
    });
  }
]);
