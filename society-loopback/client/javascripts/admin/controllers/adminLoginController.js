define([
    'angular',
    'javascripts/common/services/authentication'
], function () {
    angular.module("societyApp.admin.controller.login", [])
        .controller('adminLoginController', ['$scope', '$location', '$routeParams', 'AuthenticationService', function ($scope, $location, $routeParams, AuthenticationService) {
            $scope.actionText = 'Login';

            var action = $routeParams.action;
            if (action === 'reset') {
                $scope.actionText = 'Reset';
            } else if (action === 'register') {
                $scope.actionText = 'Register';
            }
            $scope.adminLogin = function(){
                var authenticationData = {"password": $scope.password};
              if(action !== 'reset') {
                if ($scope.username.indexOf('@') > 0) {
                  authenticationData.email = $scope.username;
                } else {
                  authenticationData.username = $scope.username;
                }
              }
                var action = $routeParams.action;
                if (action === 'reset') {
                    AuthenticationService.requestResetPassword(authenticationData);
                } else if (action === 'register') {
                    AuthenticationService.register(authenticationData);
                } else {
                    AuthenticationService.authenticate(authenticationData);
                }
            };
        }]);
});