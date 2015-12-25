define([
    'angular'
], function () {
    angular.module("societyApp.home.directive.accounttab",[])
        .directive('accountTab',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{
                    tabConfig : '=config'
                },
                controller: ['$scope',function($scope){
                }],
                templateUrl:'javascripts/home/partials/account-tab.html',
                link:function(){}
            }
        }]
    );
});