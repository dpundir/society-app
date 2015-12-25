define([
    'angular',
    'javascripts/member/services/Member'
],function(){
    angular.module("societyApp.member.controller.memberregistration", ["societyApp.member.services.member"])
        .controller('memberRegistrationController',
        ['$scope','MemberService','$location',
            function($scope, MemberService, $location){

            /*
            * @method
            * @name validateRegistrationForm
            * */
            function validateRegistrationForm(){
                return true;
            }
            /*
            * Default member
            * @type object
            * */
            $scope.member = MemberService.defaultMember();
            /*
            * Default address
            * @type object
            * */
            $scope.address = MemberService.defaultMemberAddress();
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
                format: 'dd-MMMM-yyyy',
                status: {
                    opened: false
                },
                selected:''
            };
            $scope.open = function() {
                this.dob.status.opened = true;
            };

            $scope.register = function register(form){

            };
            $scope.cancel = function cancel(){
                $location.url('/home');
            }
        }]);
});




