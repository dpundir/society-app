/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
    'angular',
    'lodash',
    'angular-bootstrap-lightbox'
], function (angular, _) {
    angular.module("societyApp.member.directives.memberNominee", ["societyApp.member.services.member"])
        .directive('memberNominee', ['MemberService', function (MemberService) {
            return {
                restrict: 'A',
                scope: {
                    member: '=',
                    isNomineeViewMode: '=',
                    actionText: '=',
                    clickHandler: '&',
                    callbacks: '='
                },
                controller: ['$scope', function ($scope) {
                    $scope.existingMember = {};
                    $scope.editable = false;
                    $scope.showDetails = false;
                    $scope.register = function(form, entity){
                        $scope.clickHandler({form: form, entity: entity});
                    };
                    $scope.$watch('member.memberNominee', function(newvalue){
                        if(newvalue && newvalue.length > 0 && newvalue[0].nominee.id){
                            $scope.showDetails = true;
                        }
                    });
                    $scope.searchMember = function(){
                        $scope.existingMember.openModal();
                    };
                    $scope.existingMember.onSelectRow = function (memberId) {
                        $scope.existingMember.id = memberId;
                        MemberService.getMemberDetail(memberId).then(function(data){
                            $scope.member.memberNominee = [{nominee: angular.copy(data.person)}];
                            $scope.member.memberNominee[0].nominee.dob = new Date(data.person.dob);
                            $scope.showDetails = true;
                            $scope.editable = true;
                            $scope.isNomineeViewMode = true;
                            $scope.member.memberNominee[0].nomineeId = data.person.id;
                            $scope.member.memberNominee[0].memberId = memberId;
                        });
                    };
                    $scope.newNominee = function(){
                        $scope.showDetails = true;
                        $scope.editable = true;
                    };
                    $scope.callbacks.tabClicked = function(){
                        $scope.showDetails = $scope.member.memberNominee && $scope.member.memberNominee.length > 0 &&
                            $scope.member.memberNominee[0].nominee && $scope.member.memberNominee[0].nominee.id
                    }
                }],
                templateUrl: 'javascripts/member/partials/memberNominee.html',
                link: function (scope, element) {
                }
            }
        }]);
});
