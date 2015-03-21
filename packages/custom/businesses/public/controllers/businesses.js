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
  .controller('BusinessRegistrationCtrl', ['$scope', 'Global', '$rootScope', 'Businesses',
    function($scope, Global, $rootScope, Businesses) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;      
      $scope.businessnameError = null;
      $scope.registerError = null;   
      $scope.successRegistrationMessage = 0;   
      $scope.existingBusinessFlag = false;           

  
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
angular.module('mean.businesses').controller('ContactsController', ['$scope','$rootScope', function($scope,$rootScope) {
    $scope.contacts = [
        {title:'General', email:'info@jkt.com', phone: '1233'}];
    $rootScope.contacts=$scope.contacts;

    $scope.addContact = function() {
        $rootScope.contacts.push({title:$scope.contact.title, email:$scope.contact.email, phone: $scope.contact.phone});
      $scope.contact = '';
    };
    }]);





