define([
    'angular'
],function(){
    angular.module("societyApp.home",[])
        .controller('homeController',['$scope',function($scope){
            $scope.navBarConfig.showNavBar = true;
    }]);
});