'use strict';

//returns count and increments count variable
angular.module('mean.rfi')
.factory('countFactory', function(){
    var countF = 1;
    return {
        getCount : function () {
            return countF;
        },
        incrementCount:function(){
           countF++;
            return countF;
        }
    };
});

angular.module('mean.rfi')
.controller('createrfiController',['$scope', 'countFactory', 'Global', 'Rfi', '$http',
    function($scope, countFactory, Global, Rfi, $http) {
      $scope.count = countFactory.getCount();
      $scope.global = Global;

      $scope.createNewRfi = function(){
        //push all item into items[]
        $scope.items = [];
        for(var i =1; i <= $scope.count; i++){
        
          //console.log($scope["item"+i]);
          if($scope["item"+i].number === undefined || $scope["item"+i].detail === undefined ){
            //add logic if value is undefined........to be done
            console.log('inside if');
          }
          else{
            $scope.items.push({
              number  : $scope["item"+i].number,
              detail  : $scope["item"+i].detail,
              quantity: $scope["item"+i].quantity
            });
          }
        }
        console.log("rfi");
        var rfi = new Rfi({
          chooseBussiness: this.chooseBussiness,
          to: this.emailAddresses,
          mailingAddress: this.mailingAddress,
          shipTo: this.shipTo,
          shipingAddress: this.shipingAddress,
          rfiDate: this.rfi.date,
          rfiDueDate: this.rfi.dueDate,
          shipVia: this.shipVia,
          items: $scope.items,
          memo: this.memo,
          message: this.message,
          approvedBy: this.approvedBy,
          todayDate: this.todayDate
        });
    
        console.log(rfi);
        //this.shipingAddress = rfi.mailingaddress;
      
        $http.post("/rfi", rfi)
          .success(function (data, status, headers)
          {
            console.log("inside success");
            console.log(data);
          })
          .error(function (data, status, headers)
          {
            console.log("inside error");
          });

        /*$http.get("/test")
          .success(function (data, status, headers, config)
          {
            console.log("inside get success");
          })
          .error(function (data, status, headers, config)
          {
            console.log("inside get error");
        });*/

    };


    //increment count when row is added
    $scope.addItem = function (){
      $scope.count = countFactory.incrementCount();
    };
    
  }
]);
/*
angular.module('mean.rfi')
.controller('ItemsController',['$scope',
    function($scope) {

      $scope.items = [];

      $scope.addItem = function (){
      if(this.item.number===undefined || this.item.detail===undefined)
      {
       console.log('heeeee');
      }
      else
      {
        $scope.items.push({number:this.item.number, detail:this.item.detail, quantity: this.item.quantity});
        $scope.item = '';
      }
    };
      
    }
]);*/

angular.module('mean.rfi')
.controller('rfiDateController',['$scope',
  function($scope) {
    $scope.rfi = {
      date: new Date()
    };
  }
]);

angular.module('mean.rfi')
.controller('dueDateController',['$scope',
  function($scope) {
    $scope.rfi = {
      dueDate: new Date()
    };
  }
]);

/*
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
*/

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

