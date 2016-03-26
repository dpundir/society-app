define([
    'angular',
    'javascripts/home/services/dashboardService'
], function (angular) {
    angular.module("societyApp.home.directive.dashboardtitle", ['societyApp.home.services.dashboard'])
        .directive('dashboardTile',['DashboardService',function (DashboardService) {
            return{
                restrict: 'A',
                scope:{
                    tileConfig : '=config'
                },
                controller: ['$scope',function($scope){
                    function init(){
                        DashboardService.getMemberCount().then(function(data){
                            $scope.memberCount = data.count;
                        });
                        DashboardService.getLoanCount().then(function(data){
                            $scope.loanCount = data.count;
                        });
                    }
                    init();
                }],
                templateUrl:'javascripts/home/partials/dashboard-tile.html',
                link:function(){}
            }
        }]
    );
});