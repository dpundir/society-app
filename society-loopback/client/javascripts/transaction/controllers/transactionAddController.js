define([
    'angular',
    'javascripts/member/services/Member'
], function () {
    angular.module("societyApp.transaction.controllers.transactionAdd",
        ["societyApp.member.services.member"])
        .controller('transactionAddController',
        ['$scope', '$cookies', '$filter', 'MemberService',
            function ($scope, $cookies, $filter, MemberService) {

                /*
                 * Default transaction history tab object
                 * */
                $scope.member = {
                };
                $scope.existingMember = {};
                $scope.memberDeposit = {
                    configureHidden: true,
                    isViewMode: true,
                    successCB: function(){},
                    errorCB: function(){}
                }
                $scope.searchMember = function(){
                    $scope.existingMember.openModal();
                };
                $scope.existingMember.onSelectRow = function (memberId) {
                    $scope.existingMember.id = memberId;
                    var defaultMemberFilter = {
                        "filter": {
                            "include": "memberDeposit"
                        }
                    };
                    MemberService.getMemberDetail(memberId, defaultMemberFilter).then(function(data){
                        $scope.member.id = data.id;
                        $scope.member.depositId = data.depositId;
                        $scope.member.deposit = data.deposit;
                        $scope.memberDeposit = angular.merge($scope.memberDeposit, data.memberDeposit);
                        $scope.memberDeposit.deposit = data.deposit;
                        $scope.showNewDeposit = true;
                        $scope.editable = true;
                        $scope.isNomineeViewMode = true;
                        $scope.editRelation = true;
                    });
                };

                /*
                 * Get all transaction history if a member based on id, start date, end data
                 * */
                $scope.getMemberDeposit = function(){
                    if($scope.member.depositId) {
                        MemberService.getMemberDeposit($scope.member.depositId).then(function (data) {
                            $scope.memberDeposit.successCB(data);
                        }, function (error) {
                            $scope.memberDeposit.errorCB(error);
                        });
                    } else{
                        $scope.memberDeposit.successCB({});
                    }
                };
                $scope.saveNewDeposit = function (transaction) {
                    transaction.createDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                    transaction.memberId = $scope.member.id;
                    transaction.depositAmount = Number(transaction.depositAmount);
                    MemberService.addNewTransaction(transaction).then(function (data) {
                        $scope.memberDeposit.deposit = data.transaction.deposit;
                        $scope.memberDeposit.successCB(undefined, true);
                    }, function (error) {
                        $scope.memberDeposit.errorCB(error);
                    })
                };
            }]);
});
