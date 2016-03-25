define([
    'angular',
    'javascripts/admin/services/user-profile-service',
    'javascripts/common/services/rest-interface'
], function () {
    angular.module("societyApp.admin.controller.userprofile",
        ["societyApp.admin.services.userprofile", "societyApp.common.services.restinterface"])
        .controller('userProfileController',
        ['$scope', '$rootScope', '$location', '$routeParams', '$filter', '$cookies', 'restInterface',
            function ($scope, $rootScope, $location, $routeParams, $filter, $cookies, restInterface) {

                var VIEW_MODE = {
                    NEW: 1,
                    VIEW: 2,
                    EDIT: 3
                };

                function updateFormView(action) {
                    switch (action) {
                        case 'view':
                            $scope.mode = VIEW_MODE.VIEW;
                            $scope.isViewMode = true;
                            $scope.actionText = 'Edit';
                            break;
                        case 'edit':
                            $scope.mode = VIEW_MODE.EDIT;
                            $scope.isViewMode = false;
                            $scope.actionText = 'Update';
                    }
                }

                /*
                 * @method
                 * @name updateUserProfile
                 * to update existing member OR add new member
                 * */
                function updateUserProfile(form, type) {

                    restInterface.update('/api/users/' + $scope.user.id, {
                        username: $scope.user.username,
                        email: $scope.user.email,
                        status: $scope.user.status
                    }).then(function (data) {
                        var user = $cookies.getObject('user');
                        user.username = data.username;
                        user.email = data.email;
                        user.status = data.status;
                        $cookies.putObject('user', user);

                        updateFormView('view');
                    });

                }

                /*
                 * @method
                 * @name initRegistrationFormViewMode
                 * initialize the form in view mode with all data
                 * */
                function initRegistrationFormViewMode() {
                    updateFormView('view');
                    restInterface.get('/api/users/detail').then(function (data) {
                        var user = $cookies.getObject('user');
                        user.id = data.id;
                        user.personId = data.personId;
                        user.memberid = data.memberid;
                        user.status = data.status;
                        user.created = data.created;
                        $scope.user = user;
                        $cookies.putObject('user', user);
                        if(!user.personId){
                            $scope.personActionText = 'Register Person';
                        } else{
                            $scope.personActionText = 'View Person';
                        }
                    });
                }

                /*
                 * @method
                 * @name initRegistrationFormEditMode
                 * */
                function initRegistrationFormEditMode() {
                    updateFormView('edit');
                    $scope.formValidationInfoText = 'Please fill all required fields marked with *.';
                }

                /*
                 * @method
                 * @name init
                 * initialization, view or new mode
                 * */
                function init() {
                    $scope.user = $cookies.getObject('user') || {};
                    $scope.personActionText = 'Register Person';
                    initRegistrationFormViewMode();
                }

                $scope.register = function register(form) {
                    switch ($scope.mode) {
                        case VIEW_MODE.VIEW:
                            initRegistrationFormEditMode();
                            break;
                        case VIEW_MODE.EDIT:
                            updateUserProfile(form, 'update');
                            break;
                    }
                };

                $scope.showPerson = function showPerson(form) {
                    if($scope.user.personId){
                        $location.url('/person/view/'+$scope.user.personId);
                    } else{
                        $location.url('/person/registration');
                    }
                };

                var personCreatedUnwatcher = $rootScope.$on('person:created', function(event, data){
                    personCreatedUnwatcher();
                    console.log(data);
                    var personId = data.id;
                    restInterface.update('/api/users/' + $scope.user.id, {personId: personId}, function(data){
                        console.log('user person detail updated');
                        var user = $cookies.getObject('user');
                        user.personId = personId;
                        $cookies.putObject('user', user);
                        $scope.personActionText = 'View Person';
                    });
                });

                /*
                 * Initialize on load
                 * */
                init();
            }]);
});