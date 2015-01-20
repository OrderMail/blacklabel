'use strict';

/*angular.module('mean.businesses').factory('Businesses', [
  function() {
    return {
      name: 'businesses'
    };
  }
]);
*/
angular.module('mean.businesses').factory('Businesses', ['$resource',
  function($resource) {
    return $resource('businesses/:businessId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);