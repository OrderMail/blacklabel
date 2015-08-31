'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
  function($scope, $rootScope, Global, Menus) {
    $scope.global = Global;
    $scope.menus = {};

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) {

      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function(menu) {
        $scope.menus[name] = menu;
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);

    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {

      queryMenu('main', defaultMainMenu);

      $scope.global = {
        authenticated: !! $rootScope.user,
        user: $rootScope.user
      };
    });

  }
]);
/*
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
*/