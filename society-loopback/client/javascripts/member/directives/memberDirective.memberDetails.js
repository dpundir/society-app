/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
  'angular',
  'lodash'
], function (angular, _) {
  angular.module("societyApp.member.directives.memberDetails",["societyApp.member.services.member"])
    .directive('memberDetails', ['fileUpload', function (fileUpload) {
      return {
        restrict: 'A',
        scope: {
          person: '=',
          address: '=',
          isViewMode: '=',
          actionText: '=',
          clickHandler: '&'
        },
        controller: ['$scope', function ($scope) {
          /*
           * @method
           * @name validateRegistrationForm
           * */
          function validateRegistrationForm(form) {
            if (form.$invalid) {
              var formFields = ['fname', 'lname', 'ffname', 'flname', 'phone', 'dob', 'address1', 'address2', 'city', 'state', 'pincode'];
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
            if (this.$parent.mode !== 2) {
              isFormValid = validateRegistrationForm(form)
            }
            if (isFormValid) {
              $scope.clickHandler({form: form});
            }
          };
          $scope.isInfoCollapsed = false;
          $scope.isAddressCollapsed = false;
            /*
             * Save a new deposit entry of a member,
             * */
            $scope.addEditProfilePhoto = function () {
                var isAddProfilePhoto = !!$scope.person.profilePhotoName;
                fileUpload.addEditProfilePhoto($scope.person.id, $scope.file, isAddProfilePhoto).then(function (data) {
                    $scope.person.profilePhotoName = data.fileName;
                }, function (error) {
                    console.log(error);
                })
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
        }],
        templateUrl: 'javascripts/member/partials/memberDetails.html',
        link: function (scope, element) {
            var fileInput = element.find('input#profilePhotoUpload');

            fileInput.bind('change', function() {
                scope.file = fileInput[0].files[0];
            });
        }
      }
    }]);
});
