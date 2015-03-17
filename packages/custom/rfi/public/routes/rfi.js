'use strict';

angular.module('mean.rfi').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('rfi example page', {
      url: '/rfi/example',
      templateUrl: 'rfi/views/index.html'
    });

    $stateProvider
	    .state('newrfi', {
	        url: '/rfi/newrfi',
	        templateUrl: 'rfi/views/newrfi.html',        
	      });

    $stateProvider
      .state('createrfi', {
          url: '/rfi/createrfi',
          templateUrl: 'rfi/views/createrfi.html',        
        });

  }
]);																																																																																																																																																																																																																																																																																																																																																																																																																																																														
