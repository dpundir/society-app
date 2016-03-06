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
                    };
                    $scope.isInfoCollapsed = false;
                    $scope.isAddressCollapsed = false;
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

                    $scope.isTnxHistoryCollapsed = false;
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
        .directive('memberDocument',['$filter', '$parse', 'fileUpload', function ($filter, $parse, fileUpload) {
            return{
                restrict: 'A',
                scope:{
                    member:'=',
                    clickHandler:'&',
                    documents: '='
                },
                controller: ['$scope',function($scope, fileUpload){
                    $scope.documents = $scope.documents || {};
                    $scope.successMsg = "Fils(s) uploaded successfully.";
                    $scope.errorMsg = "";
                    $scope.showSuccessMsg = false;
                    $scope.showErrorMsg = false;
                    $scope.documents.successCB=successCB;
                    $scope.documents.errorCB=errorCB;
                    $scope.isUploadDocumentCollapsed = true;
                    $scope.isDocumentCollapsed = false;
                    function successCB(data){
                        $scope.showSuccessMsg = false;
                        $scope.showErrorMsg = false;
                        $scope.documents.list = [];
                        _.forEach(data, function(document){
                            $scope.documents.list.push({
                                name: document,
                                href: "/file/" + $scope.member.id + "/download/" + document
                            })
                        });
                        console.log(data);
                    }
                    function errorCB(error){
                        console.log(error);
                    }
                    $scope.documentsList = [];

                }],
                templateUrl:'javascripts/member/partials/memberDocument.html',
                link:function(scope, element, attrs){
                    scope.fileQueue = [];
                    var allowedFileType = {
                        'application/pdf': true,
                        'image/jpeg': true,
                        'image/png': true
                    },maxSize = 1024*1024;
                    var fileInput = element.find('input');
                    scope.uploadFile = function(file){
                        fileUpload.uploadFileToUrl(scope.member.id, scope.files[file.index], "/file/upload").then(function(success){
                            _.remove(scope.fileQueue, function(files) {
                                return file.index === files.index;
                            });
                            if(!scope.fileQueue.length){
                                fileInput[0].value = '';
                            }
                            scope.showSuccessMsg = true;
                        },function(error){
                            scope.errorMsg = 'Error in file upload, please try again later.'
                        });
                    };
                    scope.fetchDocument = function(document){
                        fileUpload.fetchDocument(scope.member.id, document);
                    };
                    scope.uploadAllFile = function(){

                    };
                    scope.removeFile = function(index){
                        scope.fileQueue.splice(index,1);
                        if(!scope.fileQueue.length){
                            fileInput[0].value = '';
                        }
                    };
                    fileInput.bind('change', function(){
                        scope.files = fileInput[0].files;
                        scope.showErrorMsg = false;
                        if(scope.files.length >3){
                            scope.errorMsg = 'Maximum file allowed for upload is 3.';
                            scope.showErrorMsg = true;
                            fileInput[0].value = '';
                            scope.$digest();
                            return;
                        }
                        _.forEach(scope.files, function(file,index){
                            if(!(file.type in allowedFileType)){
                                scope.errorMsg = 'Invalid file type, allowed are pdf, image/jpeg, image/png, file name :' + file.name;
                                scope.showErrorMsg = true;
                                fileInput[0].value = '';
                                scope.$digest();
                                return;
                            }
                            if(file.size > maxSize){
                                scope.errorMsg = 'Max allowed file size is 1MB. file name :' + file.name;
                                scope.showErrorMsg = true;
                                fileInput[0].value = '';
                                scope.$digest();
                                return;
                            }
                            scope.fileQueue.push({
                                name: file.name,
                                type: file.type,
                                index: index
                            });
                        });
                        scope.$digest();
                    });
                }
            }
        }]
    );
});
