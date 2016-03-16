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
                        if(newValue != oldValue || (newValue &&!$scope.username)) {
                            var user = $cookies.getObject('user');
                            $scope.username = "Welcome " + (user?(user.username || user.email) : 'User');
                        }
                    });
                    $scope.logout = function () {
                        AuthenticationService.logout();
                    };
                    $scope.userProfile = function () {
                        restInterface.get('/api/users/detail').then(function (data) {
                            var user = $cookies.getObject('user');
                            user.id = data.id;
                            user.personId = data.personId;
                            user.memberid = data.memberid;
                            user.status = data.status;
                            user.created = data.created;
                            $cookies.putObject('user', user);
                            console.log(data);
                            if (data.personId) {
                                $location.url('/userprofile/view/' + data.personId);
                            } else {
                                $location.url('/userprofile/registration/new');
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