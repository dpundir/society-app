define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service',
    'javascripts/expense/services/expenseService'
], function (angular, _) {
    angular
        .module("societyApp.expense.controllers.expenseListController", [
            "societyApp.common.services.dateService",
            'societyApp.common.services.gridService',
            "societyApp.expense.services.expenseListService"])
        .controller('expenseListController',
        ['$scope', 'expenseListService', '$location', '$filter', 'uiGridConstants', 'dateService', 'gridService',
            function ($scope, expenseListService, $location, $filter, uiGridConstants, dateService, gridService) {
                function fetchExpenseIncomeList() {
                    var expenses = [];
                    expenseListService.list().then(function (data) {
                        var join = Array.prototype.join,
                            expenseList;
                        _.forEach(data, function (expense) {
                            expenseList = {};
                            expenseList.id = expense.id;
                            expenseList.debitAmount = expense.debitAmount;
                            expenseList.creditAmount = expense.creditAmount;
                            if (expense.debitAmount) {
                                expenseList.debitDescription = expense.description;
                                expenseList.debitDate = $filter('date')(expense.createDate, $scope.date.format);
                            }
                            if (expense.creditAmount) {
                                expenseList.creditDescription = expense.description;
                                expenseList.creditDate = $filter('date')(expense.createDate, $scope.date.format);
                            }
                            expenses.push(expenseList);
                        });

                        $scope.expenseListGrid.data = expenses;
                    });
                };

                $scope.expense = {};
                $scope.date = dateService.dateConfig();

                $scope.openStartdate = function () {
                    $scope.date.status.startDateOpened = !$scope.date.status.startDateOpened;
                };
                $scope.openEnddate = function () {
                    $scope.date.status.endDateOpened = !$scope.date.status.endDateOpened;
                };
                $scope.error = {
                    showErrorMsg: false,
                    errorMsg: ''
                };
                $scope.filterText = 'Show filter';
                $scope.expenseListGrid = gridService.getDefaultGridConfig([
                    {field: 'id', visible: false, enableHiding: false},
                    {field: 'creditDate', displayName: 'Date', enableHiding: false},
                    {field: 'creditDescription', displayName: 'Credit', enableHiding: false},
                    {field: 'creditAmount', displayName: 'Amount', aggregationType: uiGridConstants.aggregationTypes.sum, enableHiding: false},
                    {field: 'debitDate', displayName: 'Date', enableHiding: false},
                    {field: 'debitDescription', displayName: 'Debit', enableHiding: false},
                    {field: 'debitAmount', displayName: 'Amount', aggregationType: uiGridConstants.aggregationTypes.sum, enableHiding: false}
                ], true, {
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                        var that = this;
                        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                            that.selectedRowId = row.entity.id;
                        });
                    },
                    showColumnFooter: true
                });
                $scope.toggleFilter = function () {
                    $scope.expenseListGrid.enableFiltering = !$scope.expenseListGrid.enableFiltering;
                    if ($scope.expenseListGrid.enableFiltering) {
                        $scope.filterText = 'Hide filter';
                    } else {
                        $scope.filterText = 'Show filter';
                    }
                    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                };
                $scope.showExpenseIncomeDetails = function () {
                    $scope.showExpenseIncomeSection = true;
                };

                $scope.addExpenseIncome = function () {
                    var expense = {};
                    expense.id = '';
                    if ($scope.expense.type === 'expense') {
                        expense.debitAmount = $scope.expense.amount;
                    } else if ($scope.expense.type === 'income') {
                        expense.creditAmount = $scope.expense.amount;
                    }
                    expense.description = $scope.expense.description;
                    expense.createDate = $filter('date')($scope.expense.createDate, 'yyyy-MM-dd');
                    console.log(expense);
                    expenseListService.addExpenseIncome(expense).then(function (data) {
                        fetchExpenseIncomeList();
                    });
                }

                $scope.clear = function () {
                    $scope.expense = {};
                    console.log($scope.expense);
                }

                fetchExpenseIncomeList();
            }]);
});