define([
    'angular',
    'javascripts/member/services/Member'
], function () {
    angular.module("societyApp.transaction.controllers.transactionHistory",
        ["societyApp.member.services.member"])
        .controller('transactionHistoryController',
        ['$scope', '$cookies', 'MemberService',
            function ($scope, $cookies, MemberService) {

                /*
                 * Default transaction history tab object
                 * */
                $scope.transactionHistory = {
                    transactionMode: 'all'
                };

                /*
                 * Get all transaction history if a member based on id, start date, end data
                 * */
                $scope.getTransactionHistory = function (startDate, endDate) {
                    var memberId, roleName = $cookies.getObject('user').roleName;
                    if(roleName == 'member'){
                        memberId = $cookies.getObject('user').memberId;
                    }
                    MemberService.getTransactionHistory(memberId, startDate, endDate).then(function (data) {
                        $scope.transactionHistory.successCB(data);
                    }, function (error) {
                        $scope.transactionHistory.errorCB(error);
                    });
                };
            }]);
});
