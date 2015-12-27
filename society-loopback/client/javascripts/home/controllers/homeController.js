define([
    'angular'
],function(){
    angular.module("societyApp.home.controller.home", [])
        .controller('homeController',['$scope',function($scope){
            $scope.tabs = [
                { title:'Deposit Account', content:'No Deposit account present !' },
                { title:'Loan Account', content:'No Loan account present'}
            ];
    }]);
});