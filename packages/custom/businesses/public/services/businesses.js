'use strict';

angular.module('mean.businesses').factory('Businesses', ['$resource',
  function($resource) {
    return $resource('businesses/:businessId', {
      businessId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);