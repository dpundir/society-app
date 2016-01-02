define([
  'angular'
], function () {
  angular.module("societyApp.loan.controller.loan",
    [])
    .controller('loanController',
    ['$scope', '$location', '$routeParams', '$filter', 'restInterface',
      function ($scope, $location, $routeParams, $filter, restInterface) {
        $scope.list = function list(filter) {
          //default filter to include address and deposit history data in member
          //this relation is defined in member.json
          var defaultMemberListFilter = {
            "filter": {
              "where": {"memberid": 1},
              "include": ["memberLoan"]
            }
          };
          var defaultMemberListFilter1 = {
            "filter": {
              "where": {
                "or": [
                  {"memberid": 1},
                  {"memberrefid1": 1},
                  {"memberrefid2": 1}
                ]},
              "include": ["loan"]
            }
          };
          filter = angular.merge(filter || {}, defaultMemberListFilter1);
          return restInterface.get('/api/MemberLoans', null, filter);
        };
        $scope.detail = function detail(filter) {
          //default filter to include address and deposit history data in member
          //this relation is defined in member.json
          var defaultMemberListFilter = {
            "filter": {
              "include": ["memberLoan"]
            }
          };
          filter = angular.merge(filter || {}, defaultMemberListFilter);
          return restInterface.get('/api/Loans/' + '1', null, filter);
        };
        $scope.list();
        $scope.detail();
      }]);
});




