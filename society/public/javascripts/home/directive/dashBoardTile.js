define([
    'angular'
], function () {
    angular.module("societyApp.home")
        .directive('dashboardTile',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{
                    tileConfig : '=config'
                },
                controller: ['$scope',function($scope){
                }],
                templateUrl:'javascripts/home/partials/dashboard-tile.html',
                link:function(){}
            }
        }]
    );
});