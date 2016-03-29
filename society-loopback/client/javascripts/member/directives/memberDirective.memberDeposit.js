/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
  'angular',
  'lodash'
], function (angular, _) {
  angular.module("societyApp.member.directives.memberDeposit", [])
    .directive('memberDeposit',function () {
      return{
        restrict: 'A',
        scope:{
          deposit: "=",
          saveHandler: "&"
        },
        controller: ['$scope',function($scope){
          var installmentFreq = {
            12: 'Monthly',
            6: 'Half yearly',
            3: 'Quarterly',
            1: 'Yearly'
          };
          function resetTransaction(){
            $scope.transaction = {
              depositAmount: $scope.deposit.installmentValue,
              penaltyAmount: 0,
              type: '1',
              remarks: 'saving installment',
              id: ''
            };
          }
          function resetError(){
            $scope.error = {
              isError: false,
              errorText: ''
            };
            $scope.successMsg = '';
            $scope.showSuccessMsg = false;
            $scope.errorMsg = '';
            $scope.showErrorMsg = false;
          }
          function validateDepositForm(form){
            if(form.$invalid){
              $scope.error.isError = true;
              $scope.error.errorText = 'Field marked with * are required.';
              return false;
            }
            if(isNaN($scope.transaction.depositAmount) || isNaN($scope.transaction.penaltyAmount)){
              $scope.error.isError = true;
              $scope.error.errorText = 'Only numbers are allowed in amount field.';
              return false;
            }
            if($scope.transaction.depositAmount === 0){
              $scope.error.isError = true;
              $scope.error.errorText = 'Deposit amount cannot be 0.';
              return false;
            }
            if($scope.transaction.depositAmount < $scope.deposit.installmentValue){
              $scope.error.isError = true;
              $scope.error.errorText = 'Deposit amount cannot be less than installment value.';
              return false;
            }
            return true;
          }
          $scope.saveNewDeposit = function(form){
            var isValidDepositForm = validateDepositForm(form);
            if(isValidDepositForm){
              resetError();
              $scope.saveHandler({transaction: $scope.transaction});
            }
          };
          $scope.deposit.successCB = function(data,showSuccessMsg){
            if(data){
              if(data.installmentValue){
                $scope.transaction.depositAmount = data.installmentValue;
              }
              if(data.installmentFreq){
                $scope.installmentFrequency = installmentFreq[data.installmentFreq];
              }
              $scope.deposit.shareValue = data.shareValue;
              $scope.deposit.installmentValue = data.installmentValue;
            }else {
              $scope.isCollapsed = true;
              $scope.successMsg = 'Deposit Successful.';
              $scope.showSuccessMsg = true;
            }
            resetTransaction();
            !showSuccessMsg && resetError();
            $scope.isCollapsed = true;
          };
          $scope.deposit.errorCB = function(error){
            if(error){
              resetError();
              $scope.errorMsg = 'No data available for default member deposit.';
              $scope.showErrorMsg = true;
            }else {
              $scope.errorMsg = 'Error in deposit, please try again later.';
              $scope.showErrorMsg = true;
            }
          };
          $scope.isCollapsed = true;
          resetTransaction();
          resetError();
        }],
        templateUrl:'javascripts/member/partials/memberDeposit.html',
        link:function(){}
      }
    })
});
