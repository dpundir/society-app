/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
    'angular',
    'lodash',
    'javascripts/member/services/Member',
    "javascripts/common/directives/print-directive"
], function (angular, _) {
    angular.module("societyApp.member.directives.memberDeposit", ["societyApp.member.services.member", "societyApp.common.directives.print"])
        .directive('memberDeposit', ['MemberService', 'SelectOptions', function (MemberService, SelectOptions) {
            return {
                restrict: 'A',
                scope: {
                    memberId: '=',
                    deposit: "=",
                    saveHandler: "&"
                },
                controller: ['$scope', function ($scope) {
                    $scope.printTransaction = {
                        context: {},
                        options: {}
                    };

                    $scope.depositFrequencyOptions = SelectOptions.getDepositFrequencyOptions();

                    function getActionText() {
                        if ($scope.deposit.isViewMode) {
                            return 'Edit';
                        } else {
                            return $scope.deposit.id ? 'Update' : 'Configure'
                        }
                    }

                    function resetTransaction() {
                        $scope.transaction = {
                            depositAmount: $scope.deposit.installmentValue,
                            penaltyAmount: 0,
                            type: '1',
                            remarks: 'saving installment',
                            id: ''
                        };
                    }

                    function resetError() {
                        $scope.error = {
                            isError: false,
                            errorText: ''
                        };
                        $scope.successMsg = '';
                        $scope.showSuccessMsg = false;
                        $scope.errorMsg = '';
                        $scope.showErrorMsg = false;
                    }

                    function validateDepositForm(form) {
                        if (form.$invalid) {
                            $scope.error.isError = true;
                            $scope.error.errorText = 'Field marked with * are required.';
                            return false;
                        }
                        if (isNaN($scope.transaction.depositAmount) || isNaN($scope.transaction.penaltyAmount)) {
                            $scope.error.isError = true;
                            $scope.error.errorText = 'Only numbers are allowed in amount field.';
                            return false;
                        }
                        if ($scope.transaction.depositAmount === 0) {
                            $scope.error.isError = true;
                            $scope.error.errorText = 'Deposit amount cannot be 0.';
                            return false;
                        }
                        if ($scope.transaction.depositAmount < $scope.deposit.installmentValue) {
                            $scope.error.isError = true;
                            $scope.error.errorText = 'Deposit amount cannot be less than installment value.';
                            return false;
                        }
                        return true;
                    }

                    $scope.configureDeposit = function () {
                        if ($scope.deposit.isViewMode) {
                            $scope.deposit.isViewMode = false;
                            $scope.actionText = getActionText();
                        } else {
                            var depositRequest = {
                                installmentFreq: $scope.deposit.installmentFreq,
                                installmentValue: $scope.deposit.installmentValue,
                                shareValue: $scope.deposit.shareValue
                            };
                            if ($scope.deposit.id) {
                                MemberService.updateMemberDeposit($scope.deposit.id, depositRequest).then(function (data) {
                                    $scope.deposit.isViewMode = true;
                                    $scope.actionText = getActionText();
                                });
                            } else {
                                depositRequest.id = '';
                                MemberService.createMemberDeposit(depositRequest).then(function (data) {
                                    MemberService.updateMemberDepositId(data.id, $scope.memberId).then(function (data1) {
                                        $scope.deposit.isViewMode = true;
                                        $scope.actionText = getActionText();
                                    });
                                });
                            }
                        }
                    };
                    $scope.configureSave = function(){
                        $scope.isCollapsed = false;
                        $scope.printTransaction.context.transactionId = $scope.transactionId = undefined;
                        $scope.showSuccessMsg = false;
                        $scope.successMsg = '';
                    };
                    $scope.saveNewDeposit = function (form) {
                        var isValidDepositForm = validateDepositForm(form);
                        if (isValidDepositForm) {
                            resetError();
                            $scope.saveHandler({transaction: $scope.transaction});
                        }
                    };
                    $scope.cancelNewDeposit = function (form) {
                        $scope.isCollapsed = true;
                        $scope.printTransaction.context.transactionId = $scope.transactionId = undefined;
                        $scope.showSuccessMsg = false;
                        $scope.successMsg = '';
                    };
                    $scope.printDeposit = function (form) {
                        $scope.printTransaction.context.transactionId = $scope.transactionId;
                        $scope.printTransaction.options.openModal();
                        $scope.printTransaction.options.modalInstance.result.then(function (selectedItem){
                            $scope.cancelNewDeposit();
                        }, function(){
                            $scope.cancelNewDeposit();
                        });
                    };
                    $scope.deposit.successCB = function (data, showSuccessMsg) {
                        if (!showSuccessMsg) {
                            if (data.installmentValue) {
                                $scope.transaction.depositAmount = data.installmentValue;
                            }

                            $scope.deposit.installmentFreq = data.installmentFreq;
                            $scope.deposit.shareValue = data.shareValue;
                            $scope.deposit.installmentValue = data.installmentValue;
                            $scope.deposit.id = data.id;
                            $scope.deposit.isViewMode = !!data.id;
                            $scope.actionText = getActionText();
                        } else {
                            //$scope.isCollapsed = true;
                            $scope.transactionId = data.transactionId;
                            $scope.successMsg = 'Deposit Successful with Transaction ID:'+data.transactionId;
                            $scope.showSuccessMsg = true;
                        }
                        resetTransaction();
                        !showSuccessMsg && resetError();
                        //$scope.isCollapsed = true;
                    };
                    $scope.deposit.errorCB = function (error) {
                        if (error) {
                            resetError();
                            $scope.errorMsg = 'No data available for default member deposit.';
                            $scope.showErrorMsg = true;
                        } else {
                            $scope.errorMsg = 'Error in deposit, please try again later.';
                            $scope.showErrorMsg = true;
                        }
                    };
                    $scope.isCollapsed = true;
                    resetTransaction();
                    resetError();
                }],
                templateUrl: 'javascripts/member/partials/memberDeposit.html',
                link: function () {
                }
            }
        }])
});
