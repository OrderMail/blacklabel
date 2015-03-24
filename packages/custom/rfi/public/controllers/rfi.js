'use strict';

angular.module('mean.rfi')

.controller('createrfiController', ['$scope', 'Global', 'rfi',
    function($scope, Global, Rfi) {
      $scope.global = Global;
      alert('i am in controller 22');
      $scope.createNewRfi = function() {
          var rfi = new Rfi({
          to: this.emailAddresses,
          mailingaddress: this.MailingAddress,
          shipTo: this.shipTo,
          rfiDate: this.rfiDate,
          rfiDueDate: this.rfiDueDate,
          shipingAddress: this.shipingAddress,
          shipVia: this.shipVia,
          body: this.body,
          message: this.message,
          approvedBy: this.approvedBy,
        });
        alert(rfi);
        this.shipingAddress = rfi.mailingaddress;
      };
      
    },alert('i am in controller')

]);














/*.controller('RfiController', ['$scope', 'Global', 'Rfi',
  
    function($scope, Global, Rfi) {
	    $scope.global = Global;
      $scope.images = [];
      $scope.rfiAttachment = null;

	    $scope.package = {
	      name: 'rfi'
    	};
    $scope.done = 'true'; 
    


  /*$scope.createrfi = function() {
    $scope.subject = 'First time-  Hello ';
    console.log('sgsdgsaz');
  };


 $scope.createrfi = function() {

var rfi = new Rfi({
to: this.to,
subject: this.subject,
body: this.body,


});

        if(typeof $scope.images[0] !== 'undefined'){
          $scope.rfiAttachment =
            {
              name: $scope.images[0].name,
              src: $scope.images[0].src,
              size: $scope.images[0].size,
              type: $scope.images[0].type,
              created: Date.now()
            };
        } else {
          $scope.images = [];
        }
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
*/

