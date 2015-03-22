'use strict';

angular.module('mean.businesses')
/*
	.controller('BusinessesController', ['$scope', 'Global', 'Businesses',
	  function($scope, Global, Businesses) {
	    $scope.global = Global;
	    $scope.package = {
	      name: 'businesses'      };
  /*    $scope.findBusinesses= function() {
        $http.get('/businesses')
        .success(function(result){
          $scope.businesses=result;
        });
          

        };
	  }
	])
*/
 /*Controller to handle new business registration #7*/
  .controller('BusinessRegistrationCtrl', ['$scope', 'Global', '$rootScope', 'Businesses',/*'isUserloggedin'*//*,'promise'*/
    function($scope, Global, $rootScope, Businesses/*isUserloggedin,promise*/) {
      $scope.user = $rootScope.user;

      $scope.global = Global;
      $scope.global.registerForm = false;      
      $scope.businessnameError = null;
      $scope.registerError = null;   
      $scope.successRegistrationMessage = 0;   
      $scope.existingBusinessFlag = false;           
      console.log('User is: ++++'+ $rootScope.user);
  
      $scope.businessregistration = function() {  
        $scope.global.registerForm = false;
        $scope.businessnameError = null;
        $scope.websiteError = null;
        $scope.businessError = null;
        $scope.successRegistrationMessage = 0;           

        console.log('Contacts: '+ $scope.contacts[0]);
        var business = new Businesses({   
          category: $scope.business.category,
          website: $scope.business.website,
          businessname: $scope.business.businessname,

         addresses: [{
            addressline1: $scope.business.addressline1,
            addressline2: $scope.business.addressline2,
            city: $scope.business.city,
            state: $scope.business.state,
            country: $scope.business.country

           }],
           
           contacts: $rootScope.contacts    
          });
        alert($rootScope.contacts);
           /*}]          
          });*/         

         business.$save(function(response) {
            $scope.successRegistrationMessage = 0;
            $scope.errorMessage = 0;
          if (response.status === 'success') {
            alert(response.msg);         
       //     $location.url('/dashboard');
            //$scope.successRegistrationMessage=response.msg;
          } else if (response.status === 'failure') {
            $scope.errorMessage = response.msg;  
          }        
        });
        };     
      }
  ]);
angular.module('mean.businesses').controller('ContactsController', ['$scope','$rootScope'/*,'isUserloggedin'*/, 
  function($scope,$rootScope/*, isUserloggedin*/) {
    $scope.contacts = [
        {title:$rootScope.user.firstname, email:$rootScope.user.email, phone: '', primary:true}];
    $rootScope.contacts=$scope.contacts;

    /*$scope.setPrimary= function(email) {
      var index = -1;  
  //  var existingContacts=$scope.contacts;
   // var contactsCount = eval( $scope.contacts );
    for( var i = 0; i < $scope.contacts.length; i++ ) {
      if( $scope.contacts[i].email === email ) {
        alert('setting the contact primary '+email);
        console.log('email is '+email);
        index = i;     
      }
      $scope.contacts[i].primary=false;
      console.log('$scope.contacts[i].email'+ $scope.contacts[i].email + '$scope.contacts[i].primary'+$scope.contacts[i].primary);
    }
    if( index === -1 ) {
      alert( "Something gone wrong" );
    }
    console.log('index = '+index);

    $scope.contacts[index].primary=true;
    $rootScope.contacts[index].primary=true;    
    console.log($scope.contacts[index].primary);  
      alert(  $scope.contacts);




    };*/
$scope.setPrimary = function(contact)
{
  angular.forEach($scope.contacts, function (contactToSetFalse)
  {
      contactToSetFalse.primary=false;
  });
    contact.primary = !contact.primary;
  };

  $scope.deleteContact = function(contact){        
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
  };

    $scope.addContact = function() {
        $rootScope.contacts.push({title:$scope.contact.title, email:$scope.contact.email, phone: $scope.contact.phone});
      $scope.contact = '';
    };
    }]);





