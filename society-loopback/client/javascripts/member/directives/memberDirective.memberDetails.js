/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
    'angular',
    'lodash',
    'angular-bootstrap-lightbox'
], function (angular, _) {
    angular.module("societyApp.member.directives.memberDetails", ['bootstrapLightbox', "societyApp.member.services.member"])
        .directive('memberDetails', ['fileUpload', 'SelectOptions', 'Lightbox', function (fileUpload, SelectOptions, Lightbox) {
            return {
                restrict: 'A',
                scope: {
                    person: '=',
                    entity: '@',
                    address: '=',
                    isViewMode: '=',
                    actionText: '=',
                    clickHandler: '&',
                    editable: '='
                },
                controller: ['$scope', function ($scope) {
                    /*
                     * @method
                     * @name validateRegistrationForm
                     * */
                    function validateRegistrationForm(form) {
                        if (form.$invalid) {
                            var formFields = ['fname', 'lname', 'ffname', 'flname', 'gender', 'maritalStatus', 'phone', 'dob', 'address1', 'address2', 'city', 'state', 'pincode','guardianType'];
                            _.each(formFields, function (name) {
                                if (form[name].$invalid) {
                                    form[name].$setTouched();
                                }
                            });
                            return false;
                        } else {
                            return true;
                        }
                    }

                    $scope.isInfoCollapsed = false;
                    $scope.isAddressCollapsed = false;
                    $scope.maritalStatuses = SelectOptions.getMaritalStatusOptions();
                    $scope.genderOptions = SelectOptions.getGenderOptions();
                    $scope.statusOptions = SelectOptions.getPersonStatusOptions();

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
                        this.dob.status.opened = true;
                    };
                    $scope.register = function (form) {
                        var isFormValid = true;
                        if (this.$parent.mode !== 2 && this.$parent.$parent.mode !== 2) {
                            isFormValid = validateRegistrationForm(form)
                        }
                        if (isFormValid) {
                            $scope.clickHandler({form: form, entity: $scope.entity});
                        }
                    };
                    /*
                     * Save a new deposit entry of a member,
                     * */
                    $scope.addEditProfilePhoto = function () {
                        var isAddProfilePhoto = !$scope.person.profilePhotoName;
						if($scope.file) {
							fileUpload.addEditProfilePhoto($scope.person.id, $scope.file, isAddProfilePhoto).then(function(data) {
								$scope.person.profilePhotoName = data.fileName;
							}, function(error) {
								console.log(error);
							})
						} else{
							
						}
                    };
                    /*
                     * Save a new deposit entry of a member
                     * */
                    $scope.deleteProfilePhoto = function () {
                        fileUpload.deleteProfilePhoto($scope.person.id, $scope.person.profilePhotoName).then(function (data) {
                            $scope.person.profilePhotoName = undefined;
                        }, function (error) {
                            console.log(error);
                        })
                    };
                    $scope.setGuardianType = function(type){
                        $scope.person.guardianType = Number(type);
                    };

                    $scope.openLightboxModal = function(){
                        if($scope.person.profilePhotoName){
                            var imageArray = [
                                {
                                    'url': '/file/'+ $scope.person.id + '/document/' + $scope.person.profilePhotoName,
                                    'thumbUrl': '/file/'+ $scope.person.id + '/document/' + $scope.person.profilePhotoName
                                }
                            ];
                            Lightbox.openModal(imageArray, 0);
                        }
                    }

                }],
                templateUrl: 'javascripts/member/partials/memberDetails.html',
                link: function (scope, element) {
                    var fileInput = element.find('input#profilePhotoUpload');

                    fileInput.bind('change', function () {
                        scope.file = fileInput[0].files[0];
                        scope.addEditProfilePhoto();
                    });
                }
            }
        }]);
});
