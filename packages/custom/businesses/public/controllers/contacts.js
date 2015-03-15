'use strict';
angular.module('mean.businesses', [])
  .controller('ContactsController', ['$scope', function($scope) {
    $scope.contacts = [
        {title:'General', email:'info@jkt.com', phone: '1233'}];

    $scope.addContact = function() {
        $scope.contacts.push({title:$scope.contact.title, email:$scope.contact.email, phone: $scope.contact.phone});
      $scope.contact = '';
    };

   /*  $scope.archive = function() {
      var contacts = $scope.contacts;
      $scope.contacts = [];
      angular.forEach(contacts, function(contact) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };*/
  }]);

