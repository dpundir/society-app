define([
    'angular'
], function () {
    angular.module("societyApp.home.directive.navigationbar", [])
        .directive('navBar',['$rootScope', 'AuthenticationService', 'restInterface', function ($rootScope, AuthenticationService, restInterface) {
            return{
                restrict: 'A',
                scope:{
                    navBarConfig : '=config'
                },
                controller: ['$scope',function($scope){
                  $scope.logout = function(){
                    AuthenticationService.logout();
                  };
                  $scope.userProfile = function(){
                    restInterface.get('/usermember').then(function(data){
                      console.log(data);
                    });
                  }
                }],
                templateUrl:'javascripts/home/partials/nav-bar.html',
                link:function(){}
            }
        }]
    );
});