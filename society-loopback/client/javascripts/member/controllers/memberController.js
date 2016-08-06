define([
    'angular',
    'javascripts/member/services/Member',
    'javascripts/member/directives/memberDirectives'
], function () {
    angular.module("societyApp.member.controller.memberregistration",
        ["societyApp.member.services.member",
            "societyApp.member.directives"])
        .controller('memberRegistrationController',
        ['$scope', 'MemberService', '$location', '$routeParams', '$filter','fileUpload',
            function ($scope, MemberService, $location, $routeParams, $filter, fileUpload) {

                var VIEW_MODE = {
                    NEW: 1,
                    VIEW: 2,
                    EDIT: 3
                };

                var ACTION_TEXT = {
                    EDIT: 'Edit',
                    REGISTER: 'Register',
                    UPDATE: 'Update'
                };

                /*
                 * Default deposit tab object
                 * */
                $scope.memberDeposit = {list:[]};
                /*
                 * Default transaction history tab object
                 * */
                $scope.transactionHistory = {
                    transactionMode: 'single'
                };
                $scope.memberLoans = {};
                $scope.documents = {};
                $scope.nomineeDetail = {};
                /*
                 * @method
                 * @name updateMemberDetail
                 * to update existing member OR add new member
                 * */
                function updateMemberDetail(type, entity) {
                    function successCB() {
                        $location.url('/member');
                    }

                    function errorCB() {
                    }

                    var memberRequest = $.extend(true, {}, $scope.member);
                    memberRequest.dob = $filter('date')(memberRequest[entity].dob, 'yyyy-MM-dd');
                    if (type === 'update') {
                        MemberService.updateMember(memberRequest, entity).then(successCB, errorCB);
                    } else {
                        //$scope.member.createDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                        MemberService.addMember(memberRequest, entity).then(successCB, errorCB);
                    }
                }

                /*
                 * @method
                 * @name resetRegistrationForm
                 * reset the form on new mode
                 * */
                function initRegistrationFormNewMode() {
                    //Default member
                    $scope.member = MemberService.defaultMember({});
                    //Default address
                    $scope.member.person.address = MemberService.defaultMemberAddress({});
                    //header texts
                    $scope.primaryHeaderText = 'New Member Registration';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';

                    $scope.actionText = ACTION_TEXT.REGISTER;
                    $scope.isViewMode = false;
                    $scope.mode = VIEW_MODE.NEW;

                    $scope.nomineeActionText = ACTION_TEXT.REGISTER;
                    $scope.isNomineeViewMode = false;
                    $scope.nomineeMode = VIEW_MODE.NEW;
                }

                /*
                 * @method
                 * @name initRegistrationFormViewMode
                 * initialize the form in view mode with all data
                 * */
                function initRegistrationFormViewMode(memberId) {
                    MemberService.getMemberDetail(memberId).then(function (data) {
                        $scope.primaryHeaderText = 'Member Details';
                        $scope.secondaryHeaderText = 'To edit member details, click on edit button.';
                        $scope.formValidationInfoText = '';
                        $scope.actionText = ACTION_TEXT.EDIT;
                        $scope.isViewMode = true;
                        $scope.mode = VIEW_MODE.VIEW;

                        $scope.nomineeActionText = data.nominee? ACTION_TEXT.EDIT : ACTION_TEXT.REGISTER;
                        $scope.isNomineeViewMode = !!data.nominee;
                        $scope.nomineeMode = data.nominee? VIEW_MODE.VIEW : VIEW_MODE.NEW;

                        $scope.member = MemberService.defaultMember(data);
                        $scope.member.person.address = MemberService.defaultMemberAddress(data.person.address);
                        $scope.member.nominee.address = MemberService.defaultMemberAddress(data.nominee.address);

                        $scope.member.person.dob = new Date(data.person.dob);
                        $scope.member.person.maritalStatus = data.person.maritalStatus+'';
                        $scope.member.nominee.dob = new Date(data.nominee.dob);
                        $scope.member.nominee.maritalStatus = data.nominee.maritalStatus+'';

                        $scope.memberFullName = (data.person.fname||'')+' '+(data.person.mname||'')+' '+(data.person.lname||'');
                        $scope.memberDeposit.deposit = data.deposit;
                        $scope.memberDeposit.id = data.depositId;
                    })
                }

                /*
                 * @method
                 * @name initRegistrationFormEditMode
                 * */
                function initRegistrationFormEditMode(entity) {
                    $scope.primaryHeaderText = 'Edit Member Details';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';

                    if(entity == 'person'){
                        $scope.isViewMode = false;
                        $scope.mode = VIEW_MODE.EDIT;
                        $scope.actionText = ACTION_TEXT.UPDATE;
                    } else{
                        $scope.isNomineeViewMode = false;
                        $scope.nomineeMode = VIEW_MODE.EDIT;
                        $scope.nomineeActionText = ACTION_TEXT.UPDATE;
                    }
                }

                /*
                 * @method
                 * @name init
                 * initialization, view or new mode
                 * */
                function init() {
                    var action = $routeParams.action,
                        id = $routeParams.id;
                    switch (action) {
                        case 'view':
                            initRegistrationFormViewMode(id);
                            break;
                        case 'registration':
                            initRegistrationFormNewMode();
                            break;
                    }
                }
                /*
                * Get member deposit of selected member
                * */
                $scope.getMemberDeposit = function(){
                    if($scope.member.depositId) {
                        MemberService.getMemberDeposit($scope.member.depositId).then(function (data) {
                            $scope.memberDeposit.successCB(data);
                        }, function (error) {
                            $scope.memberDeposit.errorCB(error);
                        });
                    } else{
                        $scope.memberDeposit.successCB({});
                    }
                };
                /*
                * get all documents of member
                * */

                $scope.fetchDocumentList = function(){
                    fileUpload.fetchDocumentList($scope.member.person.id).then(function(data){
                        $scope.documents.successCB(data);
                    },function(error){
                        $scope.documents.errorCB(error);
                    });
                };
                  /*
                 * Get all transaction history if a member based on id, start date, end data
                 * */
                $scope.getTransactionHistory = function (startDate, endDate) {
                    MemberService.getTransactionHistory($scope.member.id, startDate, endDate).then(function (data) {
                        $scope.transactionHistory.successCB(data);
                    }, function (error) {
                        $scope.transactionHistory.errorCB(error);
                    });
                };
                /*
                 * Get all member loans if a member based on member id
                 * */
                $scope.getMemberLoans = function () {
                    MemberService.getMemberLoans($scope.member.id, 3).then(function (data) {
                        $scope.memberLoans.successCB(data);
                    }, function (error) {
                        $scope.memberLoans.errorCB(error);
                    });
                };
                /*
                 * Get member nominee if a member based on member id
                 * */
                $scope.getMemberNomineeDetail = function () {
                    MemberService.getMemberNomineeDetail($scope.member.id).then(function (data) {
                        $scope.nomineeDetail.successCB(data);
                    }, function (error) {
                        $scope.nomineeDetail.errorCB(error);
                    });
                };
                /*
                 * Save a new deposit entry of a member
                 * */
                $scope.saveNewDeposit = function (transaction) {
                    transaction.createDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                    transaction.memberId = $scope.member.id;
                    transaction.depositAmount = Number(transaction.depositAmount);
                    MemberService.addNewTransaction(transaction).then(function (data) {
                        $scope.memberDeposit.deposit = data.transaction.deposit;
                        $scope.memberDeposit.successCB(undefined, true);
                    }, function (error) {
                        $scope.memberDeposit.errorCB(error);
                    })
                };
                $scope.register = function register(form, entity) {
                    var mode = entity == 'person'? $scope.mode : $scope.nomineeMode;
                    switch (mode) {
                        case VIEW_MODE.VIEW:
                            initRegistrationFormEditMode(entity);
                            break;
                        case VIEW_MODE.NEW:
                            updateMemberDetail('new', entity);
                            break;
                        case VIEW_MODE.EDIT:
                            updateMemberDetail('update', entity);
                            break;
                    }
                };
                /*
                 * Initialize on load
                 * */
                init();
            }]);
});
