define([
    'angular'
], function () {
    angular.module("societyApp.admin", [])
        .controller('adminLoginController', ['$scope', '$location', function ($scope, $location) {
            $scope.adminLogin = function () {
                $location.url('/home');
            };
        }]);
});