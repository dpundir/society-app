define([
    'angular',
    'javascripts/admin/services/user-profile-service'
], function () {
    angular.module("societyApp.admin.controller.userprofile",
        ["societyApp.admin.services.userprofile"])
        .controller('userProfileController',
        ['$scope', '$location', '$routeParams','$filter', 'UserProfileService',
            function ($scope, $location, $routeParams, $filter, UserProfileService) {

                var VIEW_MODE = {
                    NEW: 1,
                    VIEW: 2,
                    EDIT: 3
                };
                /*
                 * @method
                 * @name updateUserProfile
                 * to update existing member OR add new member
                 * */
                function updateUserProfile(form, type){
                    function successCB(){
                        $location.url('/home');
                    }
                    function errorCB(){}
                    $scope.person.dob = $filter('date')($scope.person.dob,'yyyy-MM-dd');
                    if(type === 'update') {
                      //$scope.person.address = $scope.address;
                      UserProfileService.updatePerson($scope.person).then(successCB,errorCB);
                    }else{
                      //$scope.person.address = $scope.address;
                        $scope.person.createDate = $filter('date')(new Date(),'yyyy-MM-dd');
                      UserProfileService.addPerson($scope.person).then(successCB,errorCB);
                    }
                }
                /*
                * @method
                * @name resetRegistrationForm
                * reset the form on new mode
                * */
                function initRegistrationFormNewMode() {
                    //Default member
                    $scope.person = UserProfileService.defaultPerson({});
                    //Default address
                    $scope.person.address = UserProfileService.defaultAddress();
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
                function initRegistrationFormViewMode(personId){
                  UserProfileService.getPerson(personId).then(function(data){
                        $scope.primaryHeaderText = 'Member Details';
                        $scope.secondaryHeaderText = 'To edit member details, click on edit button.';
                        $scope.formValidationInfoText = '';
                        $scope.actionText = 'Edit';
                        $scope.person = UserProfileService.defaultPerson(data);
                        $scope.person.dob = new Date(data.dob);
                        $scope.isViewMode = true;
                        $scope.mode = VIEW_MODE.VIEW;
                    })
                }
                /*
                * @method
                * @name initRegistrationFormEditMode
                * */
                function initRegistrationFormEditMode(){
                    $scope.mode = VIEW_MODE.EDIT;
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
                        case VIEW_MODE.VIEW:
                            initRegistrationFormEditMode();
                            break;
                        case VIEW_MODE.NEW:
                            updateUserProfile(form,'new');
                            break;
                        case VIEW_MODE.EDIT:
                            updateUserProfile(form,'update');
                            break;
                    }
                };
                /*
                * Initialize on load
                * */
                init();
            }]);
});