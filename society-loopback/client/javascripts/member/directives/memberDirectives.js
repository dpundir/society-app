define([
    'angular',
    'lodash',
    'javascripts/member/filters/memberFilters'
], function (angular, _) {
    angular.module("societyApp.member.directives",["societyApp.member.filters"])
        .directive('memberDetails',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{
                    person : '=',
                    address: '=',
                    isViewMode:'=',
                    actionText:'=',
                    clickHandler:'&'
                },
                controller: ['$scope',function($scope){
                    /*
                     * @method
                     * @name validateRegistrationForm
                     * */
                    function validateRegistrationForm(form) {
                        if(form.$invalid){
                            var formFields = ['fname','lname','ffname','flname','phone','dob','address1','address2','city','state','pincode'];
                            _.each(formFields,function(name){
                                if(form[name].$invalid){
                                    form[name].$setTouched();
                                }
                            });
                            return false;
                        }else{
                            return true;
                        }
                    }
                    /*
                     * Default date picker config
                     * @type object
                     * */
                    $scope.dob = {
                        maxDate: new Date(),
                        dateOption: {
                            formatYear: 'yy',
                            startingDay: 1
                        },
                        format: 'dd-MM-yyyy',
                        status: {
                            opened: false
                        }
                    };
                    $scope.open = function open() {
                        this.dob.status.opened = true;
                    };
                    $scope.register = function(form){
                        var isFormValid = true;
                        if(this.$parent.mode !== 2){
                            isFormValid = validateRegistrationForm(form)
                        }
                        if(isFormValid) {
                            $scope.clickHandler({form: form});
                        }
                    }
                }],
                templateUrl:'javascripts/member/partials/memberDetails.html',
                link:function(){}
            }
        }])
        .directive('memberDeposit',['$rootScope', '$location', function ($rootScope, $location) {
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
                    $scope.$watch('deposit',function(deposit){
                         if(deposit.installmentValue){
                             $scope.transaction.depositAmount = deposit.installmentValue;
                         }
                        if(deposit.installmentFreq){
                            $scope.installmentFrequency = installmentFreq[deposit.installmentFreq];
                        }
                    },true);
                    $scope.deposit.successCB = function(){
                        $scope.isCollapsed = true;
                        $scope.successMsg = 'Deposit Successful.';
                        $scope.showSuccessMsg = true;
                        resetTransaction();
                    };
                    $scope.deposit.errorCB = function(){
                        $scope.errorMsg = 'Error in deposit, please try again later.';
                        $scope.showErrorMsg = true;
                    };
                    $scope.deposit.reset = function(){
                        $scope.isCollapsed = true;
                        resetTransaction();
                        resetError();
                    };
                    $scope.isCollapsed = true;
                    resetTransaction();
                    resetError();
                }],
                templateUrl:'javascripts/member/partials/memberDeposit.html',
                link:function(){}
            }
        }])
        .directive('memberLoan',['$rootScope', '$location', function ($rootScope, $location) {
            return{
                restrict: 'A',
                scope:{

                },
                controller: ['$scope',function($scope){
                  $scope.showDetails = function(id){
                    $location.url('/loan/1');
                  }
                }],
                templateUrl:'javascripts/member/partials/memberLoan.html',
                link:function(){}
            }
        }])
        .directive('transactionHistory',['$filter', function ($filter) {
            return{
                restrict: 'A',
                scope:{
                    memberId:'=',
                    transactionHistory:'=',
                    clickHandler:'&'
                },
                controller: ['$scope',function($scope){
                    $scope.transactionData = {};
                    $scope.date = {

                    };
                    $scope.transactionHistory.successCB = function(data){
                        $scope.transactionData = data;
                    };
                    $scope.transactionHistory.errorCB = function(){

                    };
                    $scope.getTransactionHistoryByDateRange = function(){

                    }
                }],
                templateUrl:'javascripts/member/partials/transactionHistory.html',
                link:function(){}
            }
        }]
    );
});