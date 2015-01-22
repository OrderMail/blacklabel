'use strict';

angular.module('mean.rfi').controller('RfiController', ['$scope', 'Global', 'Rfi',
  
    function($scope, Global, Rfi) {
	    $scope.global = Global;
	    $scope.package = {
	      name: 'rfi'
    	};
    


  /*$scope.createrfi = function() {
    $scope.subject = 'First time-  Hello ';
    console.log('sgsdgsaz');
  };*/


 $scope.createrfi = function() {

var rfi = new Rfi({
to: this.to,
subject: this.subject,
body: this.body,

});
alert('to   '+rfi.to+'  sub '+rfi.subject+'   body '+rfi.body);
rfi.$save(function(response) {
 // $location.path('products/' + response._id);
$scope.succ = response.msg;
});


}; 

}
]);


