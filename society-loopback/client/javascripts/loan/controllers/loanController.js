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
          var loanAvailFilter = {
            "filter": {
              "where": {"memberid": 1}
            }
          };
          var loanReferredFilter = {
            "filter": {
              "where": {
                "or": [
                  {"memberrefid1": 1},
                  {"memberrefid2": 1}
                ]}
            }
          };
          if($scope.isLoanAvailedFetch){
            filter = angular.merge(filter || {}, loanAvailFilter);
          } else{
            filter = angular.merge(filter || {}, loanReferredFilter);
          }
          return restInterface.get('/api/Loans', null, filter);
        };
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
        $scope.list();
        $scope.detail();
      }]);
});




