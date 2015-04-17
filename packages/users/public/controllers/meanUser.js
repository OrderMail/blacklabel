'use strict';
// To avoid displaying unneccesary social logins
var clientIdProperty = 'clientID',
  defaultPrefix = 'DEFAULT_';

angular.module('mean.users')
  .controller('AuthCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global',
    function($scope, $rootScope, $http, $location, Global) {
      // This object will contain list of available social buttons to authorize
      $scope.socialButtons = {};
      $scope.socialButtonsCounter = 0;
      $scope.global = Global;
      $http.get('/get-config')
        .success(function(config) {
          for (var conf in config) {
            // Do not show auth providers that have the value DEFAULT as their clientID
            if (config[conf].hasOwnProperty(clientIdProperty) && config[conf][clientIdProperty].indexOf(defaultPrefix) === -1) {
              $scope.socialButtons[conf] = true;
              $scope.socialButtonsCounter += 1;
            }
          }
        });
    }
  ])
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global',
    function($scope, $rootScope, $http, $location, Global) {
      // This object will be filled by the form
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;
      $scope.input = {
        type: 'password',
        placeholder: 'Password',
        confirmPlaceholder: 'Repeat Password',
        iconClass: '',
        tooltipText: 'Show password'
      };

      $scope.togglePasswordVisible = function() {
        $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
        $scope.input.placeholder = $scope.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        $scope.input.iconClass = $scope.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        $scope.input.tooltipText = $scope.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };

      // Register the login() function
      $scope.login = function() {
        $scope.loginerror = null;
        $http.post('/login', {
          email: $scope.user.email,
          password: $scope.user.password
        })
          .success(function(response) {
            // authentication OK
            $scope.loginError = 0;
            console.log('Added User to the Root Scope**************');
            $rootScope.user = response.user;
            $rootScope.$emit('loggedin');
            /*if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }*/
        //    $location.url('/dashboard');
            $location.url('/businessregistration');
          })
          .error(function() {             
            $scope.loginerror = 'Authentication failed.';
            $location.url('/');
          });
      };
    }
  ])
  
  .controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global','Businesses',
    function($scope, $rootScope, $http, $location, Global, Businesses) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = true;
      $scope.businessnameError = null;
      $scope.registerError = null;
      $scope.successSignUpMessage = null;
      $scope.input = {
        type: 'password',
        placeholder: 'Password',
        placeholderConfirmPass: 'Repeat Password',
        iconClassConfirmPass: '',
        tooltipText: 'Show password',
        tooltipTextConfirmPass: 'Show password'
      };
      console.log ('#################');
      var businesses = Businesses.query(function() {
        $scope.businesses=businesses;
        console.log(businesses);
      }); //query() returns all the entries
 
      $scope.formatLabel=function(model) { 
        if($scope.businesses !== undefined) {
          console.log('###In formatLabel');      
          for (var count=0; count< $scope.businesses.length; count=count+1) {
            if (model === $scope.businesses[count]._id) {
              return $scope.businesses[count].businessname;
            } else {
                return null;
            }
          }
        }
      };

      $scope.togglePasswordVisible = function() {
        $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
        $scope.input.placeholder = $scope.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        $scope.input.iconClass = $scope.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        $scope.input.tooltipText = $scope.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };

      $scope.togglePasswordConfirmVisible = function() {
        $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
        $scope.input.placeholderConfirmPass = $scope.input.placeholderConfirmPass === 'Repeat Password' ? 'Visible Password' : 'Repeat Password';
        $scope.input.iconClassConfirmPass = $scope.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
        $scope.input.tooltipTextConfirmPass = $scope.input.tooltipTextConfirmPass === 'Show password' ? 'Hide password' : 'Show password';
      };

      /*$scope.companies = ['JK Technosoft','Ticketmaster', 'Specsavers'];*/
     
      $scope.filterCondition={
        operator: 'eq'
      };

      $scope.operators = [
        {value: 'eq', displayName: 'equals'},
        {value: 'neq', displayName: 'not equal'}
      ];

     /* $scope.setBusinessToUser = function(business)
      {
        console.log ('business id received: '+business._id);
        console.log ('business name received: '+business.businessname);
        
        $scope.user.business_id=business;
        alert('business: '+business +'has been set');
      };
*/

      $scope.register = function() {        
        console.log('@@@@@@@@@@@@@@@ Business id selected is: '+$scope.user.business_id);
        
        if($scope.user.business_id === undefined) {
          alert('This business name does not exist in blacklabel, kindly create this later');
          //TODO: it requires to reset business field on UI
          //  $scope.user.business_id= '';
        }

        $http.post('/register', {
          email: $scope.user.email,
          password: $scope.user.password,
          confirmPassword: $scope.user.confirmPassword,
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname,
          business_id: $scope.user.business_id          
        })

        .success(function() {
            // authentication OK
            $scope.registerError = 0;
            $rootScope.user = $scope.user;
            $scope.successSignUpMessage='You have successfully signed up. Please check your email to activate your account.';
           /* $rootScope.$emit('loggedin');
            $location.url('/');*/
          })
          .error(function(error) {
            // Error: authentication failed
            $scope.successSignUpMessage=0;
            if (error === 'Business name already taken') {
              $scope.businessnameError = error;
            } else if (error === 'Email already taken') {
              $scope.emailError = error;
            } else $scope.registerError = error;
          });
      };
    }
  ])
  .controller('ForgotPasswordCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global',
    function($scope, $rootScope, $http, $location, Global) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;
      $scope.forgotpassword = function() {
        $http.post('/forgot-password', {
          text: $scope.user.email
        })
          .success(function(response) {
            $scope.response = response;
          })
          .error(function(error) {
            $scope.response = error;
          });
      };
    }
  ])

  /*Controller to handle new business registration #7*/
  /*.controller('BusinessRegistrationCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global',
    function($scope, $rootScope, $http, $location, Global) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;
      $scope.businessregistration = function() {
        console.log('in the MEANUSER.JS&&&&&&&&&&&&');
       $http.post('/businessregistration', {
          text: $scope.user.email
        })
          .success(function(response) {
            $scope.response = response;
          })
          .error(function(error) {
            $scope.response = error;
          });
      };
    }
  ])*/
  .controller('ResetPasswordCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'Global',
    function($scope, $rootScope, $http, $location, $stateParams, Global) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;
      $scope.resetpassword = function() {
        $http.post('/reset/' + $stateParams.tokenId, {
          password: $scope.user.password,
          confirmPassword: $scope.user.confirmPassword
        })
          .success(function(response) {
            console.log('reset pass success '+response.message);
            $scope.response = response;
            
            /*$rootScope.user = response.user;
            $rootScope.$emit('loggedin');
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }*/
          })
          .error(function(error) {
            console.log('reset pass sFails'+error.message);
            $scope.response = error;
            
            /*if (error.msg === '2')
              $scope.response = response;
            else if (error.msg === '1')
              $scope.validationError = 'User Not Found';
            else
              $scope.resetpassworderror = 'General Error';*/
          });
      };
    }
  ]);
