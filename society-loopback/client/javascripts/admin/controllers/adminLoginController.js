define([
    'angular',
    'javascripts/common/services/authentication'
], function () {
    angular.module("societyApp.admin.controller.login", [])
        .controller('adminLoginController', ['$scope', '$location', '$routeParams', 'AuthenticationService', function ($scope, $location, $routeParams, AuthenticationService) {
            $scope.actionText = 'Login';
            $scope.isError = false;
            $scope.errorLoginText = '';
            var action = $routeParams.action;
            if (action === 'reset') {
                $scope.actionText = 'Reset';
            } else if (action === 'register') {
                $scope.actionText = 'Register';
            }
            $scope.adminLogin = function (form) {
                if (form.$invalid) {
                    form.username.$setTouched();
                    form.password.$setTouched();
                    $scope.isError = true;
                    $scope.errorLoginText = "Username/password required.";
                    return;
                }
                var authenticationData = {"password": $scope.password};
                if ($scope.username && $scope.username.indexOf('@') > 0) {
                    authenticationData.email = $scope.username;
                } else {
                    authenticationData.username = $scope.username;
                }
                var action = $routeParams.action;
                if (action === 'reset') {
                    AuthenticationService.requestResetPassword(authenticationData);
                } else if (action === 'register') {
                    AuthenticationService.register(authenticationData);
                } else {
                    AuthenticationService.authenticate(authenticationData).then(function (data) {
                        $scope.isError = false;
                        $scope.errorLoginText = "";
                        $location.url('/home');
                    }, function (data) {
                        $scope.isError = true;
                        $scope.errorLoginText = 'Invalid id/password, Please try again.';
                    });
                }
            };
        }]);
});
