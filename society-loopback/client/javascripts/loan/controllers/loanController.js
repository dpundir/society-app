define([
    'angular'
], function (angular) {
    angular.module("societyApp.loan.controller.loan", [])
        .controller('loanController',
        ['$scope', '$location', '$routeParams', '$filter', 'restInterface',
            function ($scope, $location, $routeParams, $filter, restInterface) {
                $scope.memberId = undefined;
                if ($routeParams.id === 'new') {
                    $scope.newLoan = true;
                } else {
                    $scope.memberId = $routeParams.id;
                }
                $scope.createNewLoan = function () {
                    return restInterface.get('/api/Loans', null, filter);
                }
                $scope.detail = function detail(filter) {
                    //default filter to include address and deposit history data in member
                    //this relation is defined in member.json
                    var defaultMemberListFilter = {
                        "filter": {
                        }
                    };
                    filter = angular.merge(filter || {}, defaultMemberListFilter);
                    return restInterface.get('/api/Loans/' + '1', null, filter);
                };
                $scope.detail();
            }]);
});




