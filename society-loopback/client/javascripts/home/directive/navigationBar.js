define([
    'angular'
], function () {
    angular.module("societyApp.home.directive.navigationbar", [])
        .directive('navBar',['$rootScope', 'AuthenticationService',function ($rootScope, AuthenticationService) {
            return{
                restrict: 'A',
                scope:{
                    navBarConfig : '=config'
                },
                controller: ['$scope',function($scope){
                  $scope.logout = function(){
                    AuthenticationService.logout();
                  }
                }],
                templateUrl:'javascripts/home/partials/nav-bar.html',
                link:function(){}
            }
        }]
    );
});