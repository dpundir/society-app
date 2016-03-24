define([
    'angular'
], function () {
    angular.module("societyApp.home.directive.navigationbar", ['ngCookies'])
        .directive('navBar', ['$rootScope', '$location', '$cookies', 'AuthenticationService', function ($rootScope, $location, $cookies, AuthenticationService) {
            return{
                restrict: 'A',
                scope: {
                    navBarConfig: '=config'
                },
                controller: ['$scope', function ($scope) {
                    $scope.$watch(function() {
                        var user = $cookies.getObject('user');
                        return user? (user.username? user.username: user.email) : null;
                    }, function(newValue, oldValue) {
                        if(newValue != oldValue || (newValue &&!$scope.username)) {
                            var user = $cookies.getObject('user');
                            $scope.username = "Welcome " + (user?(user.username || user.email) : 'User');
                        }
                    });
                    $scope.logout = function () {
                        AuthenticationService.logout();
                    };
                    $scope.userProfile = function () {
                        $location.url('/userprofile/view');
                    }
                }],
                templateUrl: 'javascripts/home/partials/nav-bar.html',
                link: function () {
                }
            }
        }]
    );
});