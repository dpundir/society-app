/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
  'angular',
  'lodash'
], function (angular, _) {
  angular.module("societyApp.member.directives.memberDetails",[])
    .directive('memberDetails', function () {
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
            $scope.deleteProfilePhoto = function(form){
                console.log("call delete /file/:personId/profile/:fileName where file name is person.profilePhotoName");
            }
            $scope.addEditProfilePhoto = function(form){
                console.log("call for add post /file/:personId/profile and send file name as 'userProfile.<extn>'");
                console.log("call for edit put /file/:personId/profile/:fileName where file name is person.profilePhotoName");
            }
        }],
        templateUrl: 'javascripts/member/partials/memberDetails.html',
        link: function (scope) {}
      }
    });
});
