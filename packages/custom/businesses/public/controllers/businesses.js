'use strict';

angular.module('mean.businesses')

	.controller('BusinessesController', ['$scope', 'Global', 'Businesses',
	  function($scope, Global, Businesses) {
	    $scope.global = Global;
	    $scope.package = {
	      name: 'businesses'
	    };
	  }
	])

 /*Controller to handle new business registration #7*/
  .controller('BusinessRegistrationCtrl', ['$scope', 'Global', 'Businesses',
    function($scope, Global, Businesses) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;      
      $scope.businessnameError = null;
      $scope.registerError = null;      
      $scope.emailError = null;
      $scope.successRegistrationMessage = null;


      $scope.businessregistration = function() {
        $scope.global.registerForm = false;
        $scope.businessnameError = null;
        $scope.websiteError = null;
        $scope.businessError = null;
        $scope.successRegistrationMessage = null;

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
           }]          
          });
       
         business.$save({}, function(response) {
          $scope.businessError = 0;
          $scope.successRegistrationMessage=$scope.business.businessname+' has been sucessfully registered on Blacklabel!';      
            //   $location.path('products/' + response._id);
          }, function(error) {
            //$scope.errorSavingData = true;
            $scope.successRegistrationMessage=0;               
           console.log('error '+error);
            console.log('error.log '+error.log);
            console.log('error.msg '+error.msg);
            console.log('error.param '+error.param);
            if (error === 'Business name already taken') {
              $scope.businessnameError = error;
            } else if (error === 'Website already taken') {
              $scope.websiteError = error;
            } else $scope.businessError = error;
          });
        };
      }
  ]);
