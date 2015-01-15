'use strict';

angular.module('mean.rfi').controller('RfiController', ['$scope', 'Global', 'Rfi',
  
    function($scope, Global, Rfi) {
	    $scope.global = Global;
	    $scope.package = {
	      name: 'rfi'
    	};
    


  $scope.createrfi = function() {
    $scope.subject = 'First time-  Hello ';
    console.log('sgsdgsaz');
  };

}
]);


