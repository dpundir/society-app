define([
    'angular',
    'ngStorage'
], function () {
    angular.module("societyApp.admin.controller.register", ['ngStorage'])
        .controller('registerController', ['$scope', '$location', '$sessionStorage' , '$routeParams', function ($scope, $location, $sessionStorage, $routeParams) {
            if ($routeParams.message === 'success') {
                if ($sessionStorage.register) {
                    $scope.title = $sessionStorage.register.title;
                    $scope.content = $sessionStorage.register.content;
                    $scope.redirectTo = $sessionStorage.register.redirectTo;
                    $scope.redirectToLinkText = $sessionStorage.register.redirectToLinkText;
                    delete $sessionStorage.register;
                }
            } else if ($routeParams.message === 'verified') {
                $scope.title = 'Thanks for registering';
                $scope.content = '';
                $scope.redirectTo = '/app#/login';
                $scope.redirectToLinkText = 'Log in';
            }
        }]);
});