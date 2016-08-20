/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
    'angular',
    'lodash',
    'angular-bootstrap-lightbox'
], function (angular, _) {
    angular.module("societyApp.member.directives.memberNominee", ["societyApp.member.services.member"])
        .directive('memberNominee', ['MemberService','SelectOptions', function (MemberService, SelectOptions) {
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
                    $scope.editRelation = false;
                    $scope.nomineeRelations = SelectOptions.getRelations();
                    $scope.register = function(form, entity){
                        $scope.editRelation = true;
                        $scope.clickHandler({form: form, entity: entity});
                    };
                    $scope.searchMember = function(){
                        $scope.existingMember.openModal();
                    };
                    $scope.existingMember.onSelectRow = function (memberId) {
                        $scope.existingMember.id = memberId;
                        MemberService.getMemberDetail(memberId).then(function(data){
                            $scope.member.memberNominee[0].nominee = angular.copy(data.person);
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
                        $scope.editRelation = true;
                    };
                    $scope.callbacks.tabClicked = function(){
                        if($scope.member.memberNominee && $scope.member.memberNominee.length > 0 &&
                            $scope.member.memberNominee[0].nominee && $scope.member.memberNominee[0].nominee.id){
                            $scope.showDetails = true;
                            if(!$scope.member.memberNominee[0].nominee.member){
                                $scope.editable = true;
                            }
                        }
                    }
                }],
                templateUrl: 'javascripts/member/partials/memberNominee.html',
                link: function (scope, element) {
                }
            }
        }]);
});
