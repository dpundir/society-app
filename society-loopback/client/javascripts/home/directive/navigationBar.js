define([
    'angular'
], function () {
    angular.module("societyApp.home")
        .directive('navBar',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{
                    navBarConfig : '=config'
                },
                controller: ['$scope',function($scope){
                }],
                templateUrl:'javascripts/home/partials/nav-bar.html',
                link:function(){}
            }
        }]
    );
});