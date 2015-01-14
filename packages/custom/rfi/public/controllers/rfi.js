'use strict';

angular.module('mean.rfi').controller('RfiController', ['$scope', 'Global', 'Rfi',
  function($scope, Global, Rfi) {
    $scope.global = Global;
    $scope.package = {
      name: 'rfi'
    };
  }
]);
