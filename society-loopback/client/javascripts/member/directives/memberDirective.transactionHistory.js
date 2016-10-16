/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
  'angular',
  'lodash',
    'javascripts/common/services/grid-service',
    "javascripts/common/directives/print-directive"
], function (angular, _) {
  angular.module("societyApp.member.directives.transactionHistory", ['societyApp.common.services.gridService', "societyApp.common.directives.print"])
    .directive('transactionHistory',['$filter', 'gridService', function ($filter, gridService) {
      return{
        restrict: 'A',
        scope:{
          memberId:'=',
          transactionHistory:'=',
          clickHandler:'&'
        },
        controller: ['$scope',function($scope){
            $scope.printTransaction = {
                context: {},
                options: {}
            };
          $scope.transactionHistory = $scope.transactionHistory || {
              transactionMode: 'single'
          };
          $scope.date = {
            dateOption: {
              formatYear: 'yy',
              startingDay: 1
            },
            format: 'dd-MM-yyyy',
            status: {
              startDateOpened: false,
              endDateOpened: false
            },
            startDate:new Date(new Date().setDate(new Date().getDate() - 60)),
            endDate:new Date()
          };
          $scope.open = function open(type) {
            if(type === 'start'){
              this.date.status.startDateOpened = true;
            }else{
              this.date.status.endDateOpened = true;
            }
          };
          $scope.isTnxHistoryByDateCollapsed = true;
          $scope.transactionHistoryHeaderText = 'Transaction history for last 2 month';
          function resetErrorMessage(){
            $scope.errorMsg = '';
            $scope.showErrorMsg = false
          }
          $scope.transactionHistoryGrid = gridService.getDefaultGridConfig([
              {field: 'id', enableHiding: false},
              {field: 'date', enableHiding: false},
              {field: 'depositAmount', enableHiding: false},
              {field: 'penaltyAmount', enableHiding: false},
              {field: 'transactionType', enableHiding: false},
              {field: 'remarks', enableHiding: false}
          ], true, {
            onRegisterApi: function(gridApi){
              $scope.gridApi = gridApi;
                var that = this;

                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    that.selectedTransction = row.entity;
                });
            }
          });
          if($scope.transactionHistory.transactionMode == 'all'){
              $scope.transactionHistoryGrid.columnDefs.unshift({field: 'memberId', enableHiding: false});
          }
          $scope.transactionHistory.successCB = function(data){
            var transHistory = [];
            _.forEach(data,function(transaction){
              var history = {};
                if($scope.transactionHistory.transactionMode == 'all'){
                    history.memberId = transaction.memberId;
                }
                history.id = transaction.id;
              history.date = $filter('date')(transaction.createDate,$scope.date.format);
              history.depositAmount = transaction.depositAmount;
              history.penaltyAmount = transaction.penaltyAmount;
              history.transactionType = $filter('transactionType')(transaction.type);
              history.remarks = transaction.remarks;
              transHistory.push(history);
            });
            $scope.transactionHistoryGrid.data = transHistory;
            $scope.gridApi.core.handleWindowResize();
          };
          $scope.transactionHistory.errorCB = function(){

          };
          $scope.getTransactionHistoryByDateRange = function(){
            if(!$scope.date.startDate || !$scope.date.endDate){
              $scope.errorMsg = 'Please select start date and end date.';
              $scope.showErrorMsg = true;
              return;
            }
            $scope.clickHandler({startDate:$scope.date.startDate,endDate:$scope.date.endDate});
            $scope.transactionHistoryHeaderText =
              'Transaction history between ' + $filter('date')($scope.date.startDate, $scope.date.format)
              + ' and ' + $filter('date')($scope.date.endDate, $scope.date.format);
          };
            $scope.printDeposit = function(){
                $scope.printTransaction.context.transactionId = $scope.transactionHistoryGrid.selectedTransction.id;
                $scope.printTransaction.options.openModal();

            };
            if($scope.transactionHistory.transactionMode == 'all') {
                $scope.clickHandler({startDate: $scope.date.startDate, endDate: $scope.date.endDate});
            }
        }],
        templateUrl:'javascripts/member/partials/memberTransactionHistory.html',
        link:function(){}
      }
    }])
});
