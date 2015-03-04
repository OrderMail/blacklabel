'use strict';

angular.module('mean.businesses')

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
          

        };*/
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
      $scope.successRegistrationMessage = 0;   
      $scope.existingBusinessFlag = false;           

      $scope.businessList = function() {
        console.log($scope.existingBusinessSelected);

        if($scope.existingBusinessSelected) {
          console.log('Selected ---------------------');
          
          console.log('fetching businesses');
          var businesses = Businesses.query(function() {
            $scope.businesses=businesses;
            console.log(businesses);
          }); //query() returns all the entries
     
          $scope.formatLabel=function(model) {
            console.log('###In formatLabel');
            for (var count=0; count< $scope.businesses.length; count=count+1) {
              if (model === $scope.businesses[count]._id) {
                return $scope.businesses[count].businessname;
                }
              }
            };

            // Set the existing business selected flag
           $scope.existingBusinessFlag = true; 
          } else {
            console.log('Unselected ---------------------');
            // Disable the existing business selected flag
            $scope.existingBusinessFlag = false;
          }
        };  

      $scope.businessregistration = function() {  
        $scope.global.registerForm = false;
        $scope.businessnameError = null;
        $scope.websiteError = null;
        $scope.businessError = null;
        $scope.successRegistrationMessage = 0;           

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
