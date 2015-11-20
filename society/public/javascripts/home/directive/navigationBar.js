define([
    'angular'
], function () {
    angular.module("societyApp.home")
        .directive('navBar',function () {
            return{
                restrict: 'A',
                scope:{

                },
                templateUrl:'javascripts/home/partials/nav-bar.html',
                link:function(){}
            }
        }
    );
});