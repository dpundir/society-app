define([
    'angular',
    'javascripts/person/services/personServices'
], function () {
    angular.module("societyApp.person.controllers.detail",
        ["societyApp.person.services.detail"])
        .controller('personDetailController',
        ['$scope', '$rootScope', 'PersonService', '$location', '$routeParams', '$filter','MemberService',
            function ($scope, $rootScope, PersonService, $location, $routeParams, $filter, MemberService) {

                var VIEW_MODE = {
                    NEW: 1,
                    VIEW: 2,
                    EDIT: 3
                };
                $scope.existingPerson = false;
                $scope.message = {
                    showSuccessMsg: false,
                    showErrorMessage: false,
                    confirmMessage: {
                        type: 'confirm',
                        textPrimary: 'Yes',
                        textHeader: 'Confirm',
                        message: 'Are you sure you want to add this person as member?'
                    },
                    successMsg:'Member added successfully.',
                    errorMessage:'Error in adding member, please try again.'
                };
                function updateFormView(action){
                    switch(action) {
                        case 'view':
                            $scope.mode = VIEW_MODE.EDIT;
                            $scope.isViewMode = false;
                            $scope.actionText = 'Update';
                            break;
                        case 'registration':
                            $scope.mode = VIEW_MODE.NEW;
                            $scope.isViewMode = false;
                            $scope.actionText = 'Register';
                    }
                }

                /*
                 * @method
                 * @name updateMemberDetail
                 * to update existing member OR add new member
                 * */
                function updatePersonDetail(form, type) {
                    function successCB() {
                        $location.url('/settings/manage-user');
                    }

                    function errorCB() {
                        //show message.
                    }

                    var personRequest = $.extend(true, {}, $scope.person);
                    personRequest.dob = $filter('date')(personRequest.dob, 'yyyy-MM-dd');
                    if (type === 'update') {
                        PersonService.updatePerson(personRequest).then(successCB, errorCB);
                    } else {
                        PersonService.addPerson(personRequest).then(function(data){
                            $rootScope.$broadcast('person:created', data.person);
                            successCB(data);
                        }, errorCB);
                    }
                }

                /*
                 * @method
                 * @name resetRegistrationForm
                 * reset the form on new mode
                 * */
                function initRegistrationFormNewMode(action) {
                    //Default member
                    $scope.person = PersonService.defaultPerson({});
                    //Default address
                    $scope.person.address = PersonService.defaultPersonAddress({});
                    //header texts
                    $scope.primaryHeaderText = 'New Person Registration';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';
                    updateFormView(action);
                }

                /*
                 * @method
                 * @name initRegistrationFormViewMode
                 * initialize the form in view mode with all data
                 * */
                function initRegistrationFormViewMode(action, userId, personId) {
                    $scope.userId = userId;
                    $scope.personId = personId;
                    $scope.existingPerson = true;
                    PersonService.getPersonDetail(personId).then(function (data) {
                        $scope.primaryHeaderText = 'Person Details';
                        $scope.secondaryHeaderText = 'To edit person details, click on edit button.';
                        $scope.formValidationInfoText = '';
                        $scope.person = PersonService.defaultPerson(data);
                        $scope.person.address = PersonService.defaultPersonAddress(data.address);
                        $scope.person.dob = new Date(data.dob);
                        updateFormView(action);
                    })
                }

                /*
                 * @method
                 * @name initRegistrationFormEditMode
                 * */
                function initRegistrationFormEditMode(action, userId) {
                    $scope.primaryHeaderText = 'Edit Person Details';
                    $scope.secondaryHeaderText = '';
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';
                    updateFormView(action);
                }

                /*
                 * @method
                 * @name init
                 * initialization, view or new mode
                 * */
                function init() {
                    $scope.message.showSuccessMsg = false;
                    $scope.message.showErrorMessage = false;
                    var action = $routeParams.action,
                        id = $routeParams.id,
                        userId = $routeParams.userId;
                    switch (action) {
                        case 'view':
                            initRegistrationFormViewMode(action, userId, id);
                            break;
                        case 'registration':
                            initRegistrationFormNewMode(action, userId);
                            break;
                    }
                }
                $scope.isUserEditable = true;
                $scope.register = function register(form) {
                    switch ($scope.mode) {
                        case VIEW_MODE.NEW:
                            updatePersonDetail(form, 'new');
                            break;
                        case VIEW_MODE.EDIT:
                            updatePersonDetail(form, 'update');
                            break;
                    }
                };

                $scope.addMember = function(){
                    $scope.message.confirmMessage.openModal();
                };

                $scope.onAddMemberConfirm = function(){
                    var entity = {
                        id:'',
                        createDate:new Date(),
                        status: 1,
                        personId: $scope.personId,
                        deposit: 0
                    };
                    MemberService.addUserAsMember(entity).then(function(result){
                        console.log(result);

                        MemberService.updateUser({memberId:result.id}, $scope.userId).then(function(){
                            $scope.message.showSuccessMsg = true;
                            $scope.existingPerson = false;
                        }, function(){
                            $scope.message.showErrorMessage = true;
                        });
                    }, function(error){
                        $scope.message.showErrorMessage = true;
                    })
                };
                /*
                 * Initialize on load
                 * */
                init();
            }]);
});
