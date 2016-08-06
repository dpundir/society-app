/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service'
], function (angular, _) {
    angular.module("societyApp.member.directives.memberLoans", [
        "ui.grid",
        "ui.grid.selection",
        "ui.grid.pagination",
        "ui.grid.exporter",
        'societyApp.common.services.gridService'])
        .directive('memberLoans', ['$location', '$filter', 'MemberService', 'SelectOptions', 'uiGridConstants', 'gridService', function ($location, $filter, MemberService, SelectOptions, uiGridConstants, gridService) {
            return {
                restrict: 'A',
                scope: {
                    memberId: '=',
                    memberLoans: '=',
                    clickHandler: '&'
                },
                controller: ['$scope', 'gridService', function ($scope, gridService) {

                    function initLoanDetails() {
                        $scope.MEMBER_CONTEXT = $scope.memberId ? true : false;
                        $scope.defaultSocietyConfigs = MemberService.getTransformedSocietyConfig();
                        $scope.depositFrequencyOptions = SelectOptions.getDepositFrequencyOptions();
                        $scope.loanDetail = {
                            id: '',
                            amount: '',
                            frequency: 12,
                            createdate: '',
                            closedate: '',
                            installment: '',
                            memberrefid1: '',
                            memberrefid2: '',
                            memberid: ''
                        };
                    }

                    function validateLoanDetails(loanDetail) {
                        return true;
                    }

                    $scope.refOption1 = {};
                    $scope.refOption2 = {};
                    $scope.memberIdOption = {};
                    $scope.LOAN_MODE = {
                        VIEW: false,
                        NEW: false
                    };
                    $scope.memberLoans = $scope.memberLoans || {};
                    $scope.filterText = 'Show filter';
                    $scope.showLoanSection = false;
                    $scope.error = {
                        errorText: '',
                        isError: false
                    };
                    $scope.openStartdate = function () {
                        $scope.date.status.startDateOpened = !$scope.date.status.startDateOpened;
                    };
                    $scope.openEnddate = function () {
                        $scope.date.status.endDateOpened = !$scope.date.status.endDateOpened;
                    };
                    $scope.date = {
                        dateOption: {
                            formatYear: 'yy',
                            startingDay: 1,
                            format: 'dd-MM-yyyy'
                        },
                        format: 'dd-MM-yyyy',
                        status: {
                            startDateOpened: false,
                            endDateOpened: false
                        },
                        startDate: new Date(),
                        endDate: new Date()
                    };
                    $scope.memberLoansGrid = gridService.getDefaultGridConfig(
                        [
                            {field: 'id', enableHiding: false},
                            {field: 'memberId', enableHiding: false},
                            {field: 'loanAmount', enableHiding: false},
                            {field: 'remainingAmount', enableHiding: false},
                            {field: 'startDate', enableHiding: false},
                            {field: 'endDate', enableHiding: false}
                        ], true, {
                            onRegisterApi: function (gridApi) {
                                $scope.gridApi = gridApi;
                                var self = this;
                                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                    self.selectedRowId = row.entity.id;
                                });
                            }
                        });
                    $scope.memberLoans.successCB = function (data) {
                        var memberLoans = [];
                        _.forEach(data, function (loan) {
                            var memberLoan = {};
                            memberLoan.id = loan.id;
                            memberLoan.loanAmount = loan.amount;
                            memberLoan.memberId = $scope.memberId == loan.memberid ? 'SELF' : loan.memberid;
                            memberLoan.remainingAmount = loan.amount - loan.amountPaid;
                            memberLoan.startDate = $filter('date')(loan.createdate, $scope.date.format);
                            memberLoan.endDate = $filter('date')(loan.closedate, $scope.date.format);
                            memberLoans.push(memberLoan);
                        });
                        $scope.memberLoansGrid.data = memberLoans;
                        $scope.gridApi.core.handleWindowResize();
                        $scope.LOAN_MODE.NEW = false;
                        $scope.LOAN_MODE.VIEW = false;
                        $scope.showLoanSection = false;
                        $scope.loanSectionHeading = '';
                        initLoanDetails();
                    };
                    $scope.memberLoans.errorCB = function () {

                    };
                    $scope.showFilter = function () {
                        $scope.memberLoansGrid.enableFiltering = !$scope.memberLoansGrid.enableFiltering;
                        if ($scope.memberLoansGrid.enableFiltering) {
                            $scope.filterText = 'Hide filter';
                        } else {
                            $scope.filterText = 'Show filter';
                        }
                        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                    };
                    $scope.showDetails = function () {
                        if (!$scope.memberLoansGrid.selectedRowId) {
                            $scope.error.isError = true;
                            $scope.error.errorText = 'Please select a loan to see details.';
                            return;
                        }
                        MemberService.getLoanDetails($scope.memberId, $scope.memberLoansGrid.selectedRowId).then(function (data) {
                            _.forOwn($scope.loanDetail, function (value, key) {
                                $scope.loanDetail[key] = data[key];
                            });
                            $scope.loanDetail.createdate = new Date($scope.loanDetail.createdate);
                            $scope.loanDetail.closedate = new Date($scope.loanDetail.closedate);
                            $scope.loanDetail.remainingAmount = data.amount - data.amountPaid;
                        }, function (error) {
                            console.log(error);
                        });
                        $scope.LOAN_MODE.VIEW = true;
                        $scope.LOAN_MODE.NEW = false;
                        $scope.showLoanSection = true;
                        $scope.loanSectionHeading = 'Loan details';
                    };
                    $scope.newLoan = function () {
                        $scope.LOAN_MODE.NEW = true;
                        $scope.LOAN_MODE.VIEW = false;
                        $scope.showLoanSection = true;
                        $scope.loanSectionHeading = 'New Loan';
                        initLoanDetails();
                    };
                    $scope.calculateInstallment = function () {
                        $scope.loanDetail.installment = $scope.loanDetail.amount / $scope.loanDetail.frequency;
                        var interest = $scope.defaultSocietyConfigs.shareInterestRate / 1200;
                    };
                    $scope.addNewLoan = function () {
                        if (!validateLoanDetails($scope.loanDetail)) {
                            return;
                        }
                        var loanDetail = angular.copy($scope.loanDetail);
                        loanDetail.memberid = $scope.LOAN_MODE.NEW ? $scope.loanDetail.memberid : $scope.memberId;
                        MemberService.addNewLoan(loanDetail).then(function (data) {
                            console.log(data);
                            $scope.showLoanSection = false;
                            initLoanDetails();
                        }, function (error) {
                            console.log(error);
                        });
                    };
                    $scope.openMemberIdSearchModal = function () {
                        $scope.memberIdOption.openModal();
                    };
                    $scope.memberIdOption.onSelectRow = function (memberId) {
                        $scope.loanDetail.memberid = memberId;
                    };
                    $scope.openRef1SearchModal = function () {
                        $scope.refOption1.openModal();
                    };
                    $scope.refOption1.onSelectRow = function (memberId) {
                        $scope.loanDetail.memberrefid1 = memberId;
                    };
                    $scope.openRef2SearchModal = function () {
                        $scope.refOption2.openModal();
                    };
                    $scope.refOption2.onSelectRow = function (memberId) {
                        $scope.loanDetail.memberrefid2 = memberId;
                    };
                    initLoanDetails();
                }],
                templateUrl: 'javascripts/member/partials/memberLoan.html',
                link: function () {
                }
            }
        }])
});
