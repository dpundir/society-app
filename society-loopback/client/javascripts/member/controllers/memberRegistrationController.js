define([
    'angular',
    'javascripts/member/services/Member'
], function () {
    angular.module("societyApp.member.controller.memberregistration", ["societyApp.member.services.member"])
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
                 * @method
                 * @name updateMemberDetail
                 * to update existing member OR add new member
                 * */
                function updateMemberDetail(form, type){
                    function successCB(){
                        $location.url('/member');
                    }
                    function errorCB(){}
                    if(validateRegistrationForm(form)){
                        $scope.member.dob = $filter('date')($scope.dob.selected,'yyyy-MM-dd');
                        if(type === 'update') {
                            MemberService.updateMemberDetail($scope.member, $scope.address).then(successCB,errorCB);
                        }else{
                            $scope.member.createDate = $filter('date')(new Date(),'yyyy-MM-dd');
                            MemberService.addNewMemberDetail($scope.member, $scope.address).then(successCB,errorCB);
                        }
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
                    $scope.secondaryHeaderText = 'Please fill below form to add new member:';
                    $scope.formValidationInfoText = 'Please fill all required fields.';
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
                        $scope.dob.selected = new Date(data.dob);
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
                    $scope.secondaryHeaderText = 'Please update below form to edit member';
                    $scope.formValidationInfoText = 'Please fill all required fields.';
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
                    },
                    selected: ''
                };
                $scope.open = function open() {
                    this.dob.status.opened = true;
                };

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
                $scope.cancel = function cancel() {
                    $location.url('/home');
                };
                /*
                * Initialize on load
                * */
                init();
            }]);
});




