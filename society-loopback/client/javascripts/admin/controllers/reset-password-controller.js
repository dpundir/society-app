define([
  'angular',
  'javascripts/common/services/authentication'
], function () {
  angular.module("societyApp.admin.controller.reset", ['ngCookies'])
    .controller('resetPassword', ['$scope', '$location', '$routeParams', 'AuthenticationService',
      function ($scope, $location, $routeParams, AuthenticationService) {
        $cookies('access-token', $routeParams.access_token);
        $scope.resetPassword = function () {
          var authenticationData = {"password": $scope.password, "confirmation": $scope.confirmation};
          AuthenticationService.resetPassword(authenticationData);
        };
      }]);
});