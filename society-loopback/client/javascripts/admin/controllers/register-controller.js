define([
    'angular',
  'ngStorage'
], function () {
    angular.module("societyApp.admin.controller.register", ['ngStorage'])
        .controller('registerController', ['$scope', '$location', '$sessionStorage', function ($scope, $location, $sessionStorage) {
        if($sessionStorage.register) {
          $scope.title = $sessionStorage.register.title;
          $scope.content = $sessionStorage.register.content;
          $scope.redirectTo = $sessionStorage.register.redirectTo;
          $scope.redirectToLinkText = $sessionStorage.register.redirectToLinkText;
          delete $sessionStorage.register;
        }
        }]);
});