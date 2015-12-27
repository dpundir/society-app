define([
  'angular',
  'ngStorage',
  'javascripts/common/services/authentication'
], function () {
  angular.module("societyApp.admin.controller.reset", [])
    .controller('resetPassword', ['$scope', '$location', '$routeParams', 'AuthenticationService', '$sessionStorage',
      function ($scope, $location, $routeParams, AuthenticationService, $sessionStorage) {
        delete $sessionStorage.accessToken;
        $sessionStorage.accessToken = $routeParams.access_token;
        $scope.resetPassword = function () {
          var authenticationData = {"password": $scope.password, "confirmation": $scope.confirmation};
          AuthenticationService.resetPassword(authenticationData);
        };
      }]);
});