define([
    'angular',
    'lodash',
    'javascripts/member/services/Member',
    'javascripts/member/directives/memberDirectives'
], function (angular, _) {
    angular.module("societyApp.member.controller.memberregistration",
        ["societyApp.member.services.member",
            "societyApp.member.directives"])
        .controller('memberRegistrationController',
        ['$scope', 'MemberService', '$location', '$routeParams', '$filter','fileUpload', 'SelectOptions',
            function ($scope, MemberService, $location, $routeParams, $filter, fileUpload, SelectOptions) {

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
                $scope.activeTab = 0;
                $scope.isMemeberEditable = true;

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
				$scope.memberIdentities = {};
                $scope.documents = {};
                $scope.nomineeDetail = {};
                $scope.nomineeCallbacks = {
                    tabClicked: angular.noop
                };
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
                    if(entity == 'nominee') {
                        memberRequest['memberNominee'][0][entity].dob = $filter('date')(memberRequest['memberNominee'][0][entity].dob, 'yyyy-MM-dd');
                    } else{
                        memberRequest[entity].dob = $filter('date')(memberRequest[entity].dob, 'yyyy-MM-dd');
                    }
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
                    $scope.member = MemberService.defaultMember({});
                    MemberService.getMemberDetail(memberId).then(function (data) {
                        $scope.secondaryHeaderText = 'To edit details, click on edit button.';
                        $scope.formValidationInfoText = '';
                        $scope.actionText = ACTION_TEXT.EDIT;
                        $scope.isViewMode = true;
                        $scope.mode = VIEW_MODE.VIEW;

                        if(data.memberNominee && data.memberNominee.length > 0){
                            $scope.nomineeActionText = ACTION_TEXT.EDIT;
                            $scope.nomineeMode = VIEW_MODE.VIEW;
                            $scope.isNomineeViewMode = true;
                        }else{
                            $scope.nomineeActionText = ACTION_TEXT.REGISTER;
                            $scope.nomineeMode = VIEW_MODE.NEW;
                            $scope.isNomineeViewMode = false;
                        }

                        $scope.member = MemberService.defaultMember(data);
                        $scope.member.person.address = MemberService.defaultMemberAddress(data.person.address);
                        $scope.member.person.dob = new Date(data.person.dob);
                        _.forEach($scope.member.memberNominee, function(memberNominee){
                            memberNominee.nominee.address = MemberService.defaultMemberAddress(memberNominee.nominee.address);
                            memberNominee.nominee.dob = new Date(memberNominee.nominee.dob);
                        });

                        $scope.memberFullName = (data.person.firstName||'')+' '+(data.person.middleName||'')+' '+(data.person.lastName||'');
                        $scope.memberDeposit.deposit = data.deposit;
                        $scope.memberDeposit.id = data.depositId;
                    })
                }

                /*
                 * @method
                 * @name initRegistrationFormEditMode
                 * */
                function initRegistrationFormEditMode(entity) {
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';

                    if(entity == 'person' || entity == 'member'){
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
                $scope.getMemberLoans = function (type) {
                    MemberService.getMemberLoans($scope.member.id, type).then(function (data) {
                        $scope.memberLoans.successCB(data);
                    }, function (error) {
                        $scope.memberLoans.errorCB(error);
                    });
                };
				/*
				 * Get all member identities of a member based on person id
				 * */
				$scope.getMemberIdentities = function () {
					MemberService.getMemberIdentities($scope.member.person.id).then(function (data) {
						$scope.memberIdentities.successCB(data);
					}, function (error) {
						$scope.memberIdentities.errorCB(error);
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
					transaction.interestAmount = Number(transaction.interestAmount);
					transaction.penaltyAmount = Number(transaction.penaltyAmount);
					if(transaction.type == 1){
						transaction.interestAmount = 0;
					}
                    MemberService.addNewTransaction(transaction).then(function (data) {
						if(data.transaction.deposit.deposit) {
							$scope.memberDeposit.deposit = data.transaction.deposit.deposit;
						}
                        $scope.memberDeposit.successCB(data.transaction, true);
                    }, function (error) {
                        $scope.memberDeposit.errorCB(error);
                    })
                };
                $scope.register = function register(form, entity) {
                    var mode = entity == 'person' || entity == 'member'? $scope.mode : $scope.nomineeMode;
                    if(entity == 'member'){
                        entity = 'person';
                    }
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
                $scope.getStatusText = function(){
                    var personStatuses = SelectOptions.getPersonStatusOptions();
                    var personStatus = personStatuses[$scope.member.status];
                    return personStatus? personStatus.label : '';
                };

                $scope.nominationClicked = function(){
                    if($scope.activeTab === 5){
                        return;
                    }
                    $scope.actionText = ACTION_TEXT.UPDATE;
                    $scope.secondaryHeaderText = '';
                    $scope.nomineeCallbacks.tabClicked();
                };

                $scope.memberDetailsClicked = function(){
                    if($scope.activeTab === 0){
                        return;
                    }
                    $scope.isMemeberEditable = true;
                    $scope.actionText = ACTION_TEXT.EDIT;
                    $scope.isViewMode = true;
                    $scope.mode = VIEW_MODE.VIEW;
                    $scope.secondaryHeaderText = 'To edit details, click on edit button.';
                    $scope.formValidationInfoText = '';
                };
                /*
                 * Initialize on load
                 * */
                init();
            }]);
});
