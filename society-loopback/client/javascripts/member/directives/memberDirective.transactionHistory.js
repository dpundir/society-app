/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
  'angular',
  'lodash'
], function (angular, _) {
  angular.module("societyApp.member.directives.transactionHistory", [])
    .directive('transactionHistory',['$filter', function ($filter) {
      return{
        restrict: 'A',
        scope:{
          memberId:'=',
          transactionHistory:'=',
          clickHandler:'&'
        },
        controller: ['$scope',function($scope){
          $scope.transactionHistory = $scope.transactionHistory || {};
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
          $scope.transactionHistoryGrid = {
            enableSorting: false,
            enableFiltering: false,
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            multiSelect : false,
            modifierKeysToMultiSelect : false,
            noUnselect : true,
            paginationPageSizes: [15, 30, 45],
            paginationPageSize: 15,
            enableColumnMenus: false,
            onRegisterApi: function(gridApi){
              $scope.gridApi = gridApi;
            },
            columnDefs: [
              {field: 'date'},
              {field: 'depositAmount'},
              {field: 'penaltyAmount'},
              {field: 'transactionType'},
              {field: 'remarks'}
            ],
            data:[]
          };
          $scope.transactionHistory.successCB = function(data){
            var transHistory = [];
            _.forEach(data,function(transaction){
              var history = {};
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
          }
        }],
        templateUrl:'javascripts/member/partials/transactionHistory.html',
        link:function(){}
      }
    }])
});
