define([
    'angular',
    'javascripts/member/services/Member'
], function () {
    angular
        .module("societyApp.member.controller.memberlist", ["societyApp.member.services.member"])
        .controller('memberListController',
        ['$scope', 'MemberService',
            function ($scope, MemberService) {
                $scope.people =[];
                $scope.header = [
                    {
                        label: '',
                        type: 'img'
                    },
                    {
                        label: 'Name'
                    },
                    {
                        label: 'Address'
                    },
                    {
                        label: 'Total deposit'
                    }
                ];
                $scope.activeActions = function(empId){

                };
              MemberService.list().then(function(data){
                console.log(data);
                $scope.people = data;
              })
            }]);
});