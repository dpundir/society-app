define([
  'angular',
  'javascripts/common/services/authentication'
], function () {
  angular.module("societyApp.admin.controller.reset", ['ngCookies'])
    .controller('resetPassword', ['$scope', '$location', '$cookies','$routeParams', 'AuthenticationService',
      function ($scope, $location,$cookies, $routeParams, AuthenticationService) {
        $cookies.put('access-token', $routeParams.access_token);
        $scope.resetPassword = function () {
          var authenticationData = {"password": $scope.password, "confirmation": $scope.confirmation};
          AuthenticationService.resetPassword(authenticationData);
        };
      }]);
});
