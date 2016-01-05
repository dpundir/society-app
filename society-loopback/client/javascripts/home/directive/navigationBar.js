define([
    'angular'
], function () {
    angular.module("societyApp.home.directive.navigationbar", ['ngCookies'])
        .directive('navBar', ['$rootScope', '$location', '$cookies', 'AuthenticationService', 'restInterface', function ($rootScope, $location, $cookies, AuthenticationService, restInterface) {
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
                        if(newValue != oldValue) {
                            var user = $cookies.getObject('user');
                            $scope.username = "Welcome " + (user?(user.username || user.email) : 'User');
                        }
                    });
                    $scope.logout = function () {
                        AuthenticationService.logout();
                    };
                    $scope.userProfile = function () {
                        restInterface.get('/api/users/detail').then(function (data) {
                            console.log(data);
                            if (data.memberid) {
                                $location.url('/member/view/' + data.memberid);
                            } else if (data.personId) {
                                $location.url('/userprofile/view/' + data.personId);
                            }
                        });
                    }
                }],
                templateUrl: 'javascripts/home/partials/nav-bar.html',
                link: function () {
                }
            }
        }]
    );
});