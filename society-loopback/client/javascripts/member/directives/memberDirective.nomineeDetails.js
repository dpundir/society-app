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
                    $scope.$watch('member.nominee', function(newvalue){
                        if(newvalue.id){
                            $scope.showDetails = true;
                        }
                    });
                    $scope.searchMember = function(){
                        $scope.existingMember.openModal();
                    };
                    $scope.existingMember.onSelectRow = function (memberId) {
                        $scope.existingMember.id = memberId;
                        MemberService.getMemberDetail(memberId).then(function(data){
                            $scope.member.nominee = angular.copy(data.person);
                            $scope.member.nominee.dob = new Date(data.person.dob);
                            $scope.showDetails = true;
                            $scope.editable = true;
                            $scope.isNomineeViewMode = true;
                            $scope.member.nomineeId=data.person.id;
                        });
                    };
                    $scope.newNominee = function(){
                        $scope.showDetails = true;
                        $scope.editable = true;
                    };
                    $scope.callbacks.tabClicked = function(){
                        $scope.showDetails = $scope.member.nominee && $scope.member.nominee.id
                    }
                }],
                templateUrl: 'javascripts/member/partials/memberNominee.html',
                link: function (scope, element) {
                }
            }
        }]);
});
