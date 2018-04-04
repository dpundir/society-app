define([
    'angular',
    'javascripts/member/services/Member'
], function () {
    angular.module("societyApp.loan.controllers.loansearch",
        ["societyApp.member.services.member"])
        .controller('loanSearchController',
        ['$scope', 'MemberService', '$location', '$routeParams', '$filter','fileUpload',
            function ($scope, MemberService, $location, $routeParams, $filter, fileUpload) {
                $scope.memberLoans = {};

                /*
                 * Get all member loans if a member based on member id
                 * */
                function getAllMemberLoans () {
                    MemberService.getAllMemberLoans().then(function (data) {
                        $scope.memberLoans.successCB(data);
                    }, function (error) {
                        $scope.memberLoans.errorCB(error);
                    });
                };
                getAllMemberLoans();
            }]);
});
