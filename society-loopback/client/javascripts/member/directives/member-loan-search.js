define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service',
	'javascripts/common/services/date-service',
	'javascripts/member/services/Member'
], function (angular, _) {
    angular.module("societyApp.member.memberLoanSearchDirective", ["societyApp.common.services.gridService", 'societyApp.member.services.member'])
        .directive('memberLoanSearch', ['MemberService', '$filter', '$uibModal', 'gridService', 'dateService', function (MemberService, $filter, $uibModal, gridService, DateService) {
            return {
                restrict: 'EA',
                scope: {
                    option: '='
                },
                controller: ['$scope', memberLoanSearchController],
                link: function () {
                }
            };
            function memberLoanSearchController($scope) {
                $scope.option = $scope.option || {};
                $scope.error = {
                    errorText: '',
                    isError: false
                };
                $scope.memberLoanListSearchGrid = gridService.getDefaultGridConfig([
                    {field: 'id', displayName: 'Id'},
                    {field: 'memberId', displayName: 'Member Id'},
                    {field: 'createDate', displayName: 'Create Date', cellFilter: 'date:"dd-MM-yyyy"'},
                    {field: 'closeDate', displayName: 'Close Date', cellFilter: 'date:"dd-MM-yyyy"'},
					{field: 'amount', displayName: 'Loan Amount'},
					{field: 'interest', displayName: 'Interest'},
					{field: 'installment', displayName: 'Installment'},
					{field: 'frequency', displayName: 'Frequency', cellFilter: 'installmentFrequency'}
                ], false, {
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                        var that = this;
                        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                            that.selectedRowId = row.entity.id;
							that.selectedRow = row.entity;
                        });
                    }
                });
                var modalInstance;
                $scope.option.openModal = function () {
                    $scope.option.searchModel = '';
                    $scope.error.isError = false;
                    $scope.memberLoanListSearchGrid.data = [];
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'javascripts/member/partials/memberLoanSearch.html',
                        backdrop: 'true',
                        size: 'lg',
                        scope: $scope
                    });
                };
                $scope.keyDown = function(event){
                    if(event.which === 13){
                        $scope.search();
                    }
                };
                $scope.search = function () {
                    MemberService.getMemberLoans($scope.option.memberId, 1, undefined, undefined, true).then(function (data) {
                        if (!data.length) {
                            $scope.error.isError = true;
                            $scope.error.errorText = 'No result found, please refine your search.'
                        } else {
                            $scope.error.isError = false;
                        }
						_.forEach(data, function(row){
							row.createdate = $filter('date')(row.createdate, DateService.dateConfig().format);
							row.closedate = $filter('date')(row.closedate, DateService.dateConfig().format);
						});
                        $scope.memberLoanListSearchGrid.data = data;
                    });
                };
                $scope.ok = function () {
                    if (!$scope.memberLoanListSearchGrid.selectedRowId) {
                        $scope.error.isError = true;
                        $scope.error.errorText = 'Please select a row.';
                        return;
                    }
                    $scope.option.onSelectRow($scope.memberLoanListSearchGrid.selectedRow);
                    modalInstance.close();
                };
                $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                }
            }
        }]);
});
