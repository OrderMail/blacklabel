'use strict';

angular.module('mean.rfi').controller('RfiController', ['$scope', 'Global', 'Rfi',
  
    function($scope, Global, Rfi) {
	    $scope.global = Global;
	    $scope.package = {
	      name: 'rfi'
    	};
    $scope.done = 'true'; 
    


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
//alert('to   '+rfi.to+'  sub '+rfi.subject+'   body '+rfi.body+'  attachment '+rfi.attachment);
//console.log('attachment '+rfi.attachment);
rfi.$save(function(response) {
	$scope.succ = response.msg;
	if(response.status === 'success')
		$scope.done = '';
});


}; 

}
]);


