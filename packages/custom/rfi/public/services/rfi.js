'use strict';
/*
angular.module('mean.rfi').factory('Rfi', [
  function() {
    return {
      name: 'rfi'
    };
  }
]);*/

angular.module('mean.rfi').factory('Rfi', ['$resource',
  function($resource) {
    return $resource('rfi/:rfiId', {
      rfiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);