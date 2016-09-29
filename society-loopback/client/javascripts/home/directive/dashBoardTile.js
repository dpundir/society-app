define([
    'angular',
    'javascripts/home/services/dashboardService'
], function (angular) {
    angular.module("societyApp.home.directive.dashboardtile", ['societyApp.home.services.dashboard'])
        .directive('dashboardTile',['DashboardService',function (DashboardService) {
            return{
                restrict: 'A',
                scope:{
                    tileConfig : '=config'
                },
                controller: ['$scope', '$cookies', function($scope, $cookies){
                    function init(){
                        $scope.roleName = $cookies.getObject('user').roleName;
                        if($scope.roleName != 'member') {
                            DashboardService.getMemberCount().then(function (data) {
                                $scope.memberCount = data.count;
                            });
                            DashboardService.getLoanCount().then(function(data){
                                $scope.loanCount = data.count;
                            });
                            DashboardService.getMemberBalance().then(function(data){
                                $scope.memberBalance = data.total;
                            });
                            DashboardService.getLoanTotal().then(function(data){
                                $scope.loanTotal = data.total;
                            });
                            DashboardService.getExpenseTotal().then(function(data){
                                $scope.societyExpense = data.total;
                            });
                            DashboardService.getIncomeTotal().then(function(data){
                                $scope.societyIncome = data.total;
                            });
                        }
                    }
                    init();
                }],
                templateUrl:'javascripts/home/partials/dashboard-tile.html',
                link:function(){}
            }
        }]
    );
});