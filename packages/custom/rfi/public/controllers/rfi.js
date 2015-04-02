'use strict';

angular.module('mean.rfi')

.controller('createrfiController',['$scope', 'Global', 'Rfi',
    function($scope, Global, Rfi) {
      $scope.global = Global;
    //  alert('i am in controller 22');
    console.log('Inside createrfiController');
      $scope.createNewRfi = function() {
        console.log('Inside createrNewRFI 11111');
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
          approvedBy: this.approvedBy
        });
        console.log('Inside createrNewRFI');
        this.shipingAddress = rfi.mailingaddress;
      };
      
    } 
]);

angular.module('mean.rfi').controller('ItemsController', ['$scope','$rootScope', 
  function($scope,$rootScope) {

        $scope.items = 
          [{itemNumber:$rootScope.item.number, itemDetail:$rootScope.item.detail, itemQuantity:$rootScope.item.quantity}];
        
        console.log('Hello');
        $rootScope.items=$scope.items;
  

      
    $scope.addItems = function() 
    {
      if($scope.item.number===undefined || $scope.item.detail===undefined)
      {
        $scope.contactError=true;
        $scope.contactErrorMsg='Please enter a title and an email address for this contact';
      }
      else
      {
        $rootScope.items.push({itemNumber:$scope.item.number, itemDetail:$scope.item.detail, itemQuantity: $scope.item.quantity});
      
      $scope.item = '';
      }
    };
  }
]);


/*$scope.deleteContact = function(contact)
{   
  if(contact.primary)     
      
    {
      $scope.contactError=true;
      $scope.contactErrorMsg='Cannot delete a primary contact, please change the primary contact before you delete this contact.';

    }
  else
  {
    var index = -1;   
    var comArr = eval( $scope.contacts );
    for( var i = 0; i < comArr.length; i++ ) {

      if( comArr[i].title === contact.title ) {
        index = i;
        break;
      }
    }
    if( index === -1 ) {
      alert( "Something gone wrong" );
    }
    $scope.contacts.splice( index, 1 );   
  } 
};*/




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

