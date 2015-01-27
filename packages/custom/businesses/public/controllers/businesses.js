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
        $scope.businessError = null;
        $scope.successRegistrationMessage = null;

        var business = new Businesses({
         //email: $scope.user.email, 
          category: $scope.user.category,
          website: $scope.user.website,
          businessname: $scope.user.businessname,

         addresses: [{
            addressline1: $scope.user.addressline1,
            addressline2: $scope.user.addressline2,
            city: $scope.user.city,
            state: $scope.user.state,
            country: $scope.user.country
           }]          
          });
       
         business.$save({}, function(response) {
          $scope.businessError = 0;
          $scope.successRegistrationMessage='Your company XXX has sucessfully registered on Blacklabel!'; 
            //   $location.path('products/' + response._id);
          }, function(error) {
            //$scope.errorSavingData = true;
            $scope.successRegistrationMessage=0;
          /*  if (error.param === 'businessname') {
              $scope.businessnameError = error.msg;
            } else if (error === 'Website already taken') {
              $scope.websiteError = error;
            } else 
              $scope.businessError = error;*/
              
              console.log('error '+error);
              console.log('error.msg '+error.msg);
              console.log('error.param '+error.param);
              if (error === 'Business name already taken') {
              $scope.businessnameError = error;
            } else if (error === 'Website already taken') {
              $scope.emailError = error;
            } else $scope.businessError = error;
          });
        };
      }
  ]);
