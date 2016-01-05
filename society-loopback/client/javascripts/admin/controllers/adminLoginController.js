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
            $scope.headerText = 'Login';
            if (action === 'reset') {
                $scope.headerText = 'Reset password';
                $scope.actionText = 'Reset';
            } else if (action === 'register') {
                $scope.headerText = 'Register';
                $scope.actionText = 'Register';
            }
            function validateLoginForm(action, form){
                var isFormValid = true;
                switch(action){
                    case 'login':
                        if(!$scope.username || !$scope.password){
                            $scope.isError = true;
                            $scope.errorLoginText = "Username/password required.";
                            isFormValid = true;
                        }
                        break;
                    case 'register':
                        if (form.$invalid) {
                            $scope.loader.show = false;
                            form.username.$setTouched();
                            form.password.$setTouched();
                            form.email.$setTouched();
                            $scope.isError = true;
                            $scope.errorLoginText = "All fields are required.";
                            isFormValid = true;
                        }
                        break;
                    case 'reset':
                        if(!$scope.username){
                            $scope.isError = true;
                            $scope.errorLoginText = "Username required.";
                            isFormValid = true;
                        }
                        break;
                }
                return isFormValid;
            }
            $scope.adminLogin = function (form) {
                var action = $routeParams.action;
                $scope.loader.show = true;
                if (!validateLoginForm(action, form)){
                    return;
                }
                var authenticationData = {"password": $scope.password};
                if (action === 'reset') {
                    authenticationData.email = $scope.username;
                    AuthenticationService.requestResetPassword(authenticationData);
                } else if (action === 'register') {
                    authenticationData.username = $scope.username;
                    authenticationData.email = $scope.email;
                    AuthenticationService.register(authenticationData);
                } else {
                    if ($scope.username && $scope.username.indexOf('@') > 0) {
                        authenticationData.email = $scope.username;
                    } else {
                        authenticationData.username = $scope.username;
                    }
                    AuthenticationService.authenticate(authenticationData).then(function (data) {
                        $scope.isError = false;
                        $scope.errorLoginText = "";
                        $location.url('/home');
                        $scope.loader.show = false;
                    }, function (data) {
                        $scope.loader.show = false;
                        $scope.isError = true;
                        $scope.errorLoginText = 'Invalid id/password, Please try again.';
                    });
                }
            };
        }]);
});
