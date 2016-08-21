define([
    'angular',
    'javascripts/person/services/personServices'
], function () {
    angular.module("societyApp.person.controllers.detail",
        ["societyApp.person.services.detail"])
        .controller('personDetailController',
        ['$scope', '$rootScope', 'PersonService', '$location', '$routeParams', '$filter','fileUpload',
            function ($scope, $rootScope, PersonService, $location, $routeParams, $filter, fileUpload) {

                var VIEW_MODE = {
                    NEW: 1,
                    VIEW: 2,
                    EDIT: 3
                };

                function updateFormView(action){
                    switch(action) {
                        case 'view':
                            $scope.mode = VIEW_MODE.VIEW;
                            $scope.isViewMode = true;
                            $scope.actionText = 'Edit';
                            break;
                        case 'edit':
                            $scope.mode = VIEW_MODE.EDIT;
                            $scope.isViewMode = false;
                            $scope.actionText = 'Update';
                            break;
                        case 'registration':
                            $scope.mode = VIEW_MODE.NEW;
                            $scope.isViewMode = false;
                            $scope.actionText = 'Registration';
                    }
                };

                /*
                 * @method
                 * @name updateMemberDetail
                 * to update existing member OR add new member
                 * */
                function updatePersonDetail(form, type) {
                    function successCB() {
                        updateFormView('view');
                    }

                    function errorCB() {
                        updateFormView('edit');
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
                function initRegistrationFormViewMode(action, personId) {
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
                function initRegistrationFormEditMode(action) {
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
                    var action = $routeParams.action,
                        id = $routeParams.id;
                    switch (action) {
                        case 'view':
                            initRegistrationFormViewMode(action, id);
                            break;
                        case 'registration':
                            initRegistrationFormNewMode(action);
                            break;
                    }
                };

                $scope.isUserEditable = true;
                $scope.register = function register(form) {
                    switch ($scope.mode) {
                        case VIEW_MODE.VIEW:
                            initRegistrationFormEditMode('edit');
                            break;
                        case VIEW_MODE.NEW:
                            updatePersonDetail(form, 'new');
                            break;
                        case VIEW_MODE.EDIT:
                            updatePersonDetail(form, 'update');
                            break;
                    }
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
                 * Default date picker config
                 * @type object
                 * */
                $scope.dob = {
                    dateOption: {
                        formatYear: 'yy',
                        maxDate: new Date(),
                        startingDay: 1
                    },
                    format: 'dd-MM-yyyy',
                    status: {
                        opened: false
                    }
                };

                $scope.open = function open() {
                    $scope.dob.status.opened = true;
                };
                /*
                 * Initialize on load
                 * */
                init();
            }]);
});
