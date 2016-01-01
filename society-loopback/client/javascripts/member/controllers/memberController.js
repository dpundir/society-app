define([
    'angular',
    'javascripts/member/services/Member',
    'javascripts/member/directives/memberDirectives'
], function () {
    angular.module("societyApp.member.controller.memberregistration",
        ["societyApp.member.services.member",
        "societyApp.member.directives"])
        .controller('memberRegistrationController',
        ['$scope', 'MemberService', '$location', '$routeParams','$filter',
            function ($scope, MemberService, $location, $routeParams, $filter) {

                var VIEW_MODE = {
                    NEW: 1,
                    EDIT: 2,
                    UPDATE: 3
                };
                /*
                 * @method
                 * @name updateMemberDetail
                 * to update existing member OR add new member
                 * */
                function updateMemberDetail(form, type){
                    function successCB(){
                        $location.url('/member');
                    }
                    function errorCB(){}
                    $scope.member.dob = $filter('date')($scope.member.dob,'yyyy-MM-dd');
                    if(type === 'update') {
                        MemberService.updateMemberDetail($scope.member, $scope.address).then(successCB,errorCB);
                    }else{
                        $scope.member.createDate = $filter('date')(new Date(),'yyyy-MM-dd');
                        MemberService.addNewMemberDetail($scope.member, $scope.address).then(successCB,errorCB);
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
                    $scope.address = MemberService.defaultMemberAddress();
                    //header texts
                    $scope.primaryHeaderText = 'New Member Registration';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';
                    $scope.actionText = 'Register';
                    $scope.mode = VIEW_MODE.NEW;
                    $scope.isViewMode = false;
                }
                /*
                * @method
                * @name initRegistrationFormViewMode
                * initialize the form in view mode with all data
                * */
                function initRegistrationFormViewMode(memberId){
                    MemberService.getMemberDetail(memberId).then(function(data){
                        $scope.primaryHeaderText = 'Member Details';
                        $scope.secondaryHeaderText = 'To edit member details, click on edit button.';
                        $scope.formValidationInfoText = '';
                        $scope.actionText = 'Edit';
                        $scope.address = data.address;
                        $scope.member = MemberService.defaultMember(data);
                        $scope.member.dob = new Date(data.dob);
                        $scope.isViewMode = true;
                        $scope.mode = VIEW_MODE.EDIT;
                    })
                }
                /*
                * @method
                * @name initRegistrationFormEditMode
                * */
                function initRegistrationFormEditMode(){
                    $scope.mode = VIEW_MODE.UPDATE;
                    $scope.isViewMode = false;
                    $scope.primaryHeaderText = 'Edit Member Details';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';
                    $scope.actionText = 'Update';
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

                $scope.register = function register(form) {
                    switch($scope.mode){
                        case VIEW_MODE.EDIT:
                            initRegistrationFormEditMode();
                            break;
                        case VIEW_MODE.NEW:
                            updateMemberDetail(form,'new');
                            break;
                        case VIEW_MODE.UPDATE:
                            updateMemberDetail(form,'update');
                            break;
                    }
                };
                /*
                * Initialize on load
                * */
                init();
            }]);
});




