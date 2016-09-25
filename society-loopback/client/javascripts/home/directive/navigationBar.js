define([
    'angular',
    'javascripts/common/services/authentication',
    'javascripts/common/directives/common-directives'
], function () {
    angular.module("societyApp.home.directive.navigationbar", ['ngCookies',
        'societyApp.common.services.authentication',
        'societyApp.common.directives.commonDirectives'])
        .directive('navBar', ['$location', '$cookies', 'AuthenticationService', 'restInterface', function ($location, $cookies, AuthenticationService, restInterface) {
            return{
                restrict: 'A',
                scope: {
                    navBarConfig: '=config'
                },
                controller: ['$scope', function ($scope) {
                    $scope.message = {};
                    $scope.roleName = $cookies.getObject('user').roleName;
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
                    };
                    $scope.searchMemberById = function(){
                        restInterface.get('/api/Members/'+$scope.memberId+'/exists').then(
                            function(data){
                                if(data.exists) {
                                    $location.url('/member/view/' + $scope.memberId);
                                } else{
                                    $scope.message.message = "Member Id:" + $scope.memberId + " Not Found";
                                    $scope.message.openModal();
                                }
                                $scope.memberId = undefined;
                            });
                    };
                }],
                templateUrl: 'javascripts/home/partials/nav-bar.html',
                link: function () {
                }
            }
        }]
    );
});