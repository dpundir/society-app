define([
    'angular',
    'javascripts/common/services/rest-interface'
], function (angular) {
    angular.module("societyApp.home.services.dashboard", ['societyApp.common.services.restinterface'])
        .service('DashboardService', ['$http', '$q', 'restInterface', function ($http, $q, restInterface) {
            this.getMemberCount = function () {
                var filter = {
                    "where": {"status": 1}
                };
                return restInterface.get('/api/Members/count', null, filter);
            };
            this.getMemberBalance = function () {
                var filter = {
                    "where": {"status": 1},
                    "field": {"name": "deposit"}
                };
                return restInterface.get('/api/Members/total', null, filter);
            };
            this.getMemberDeposit = function (id) {
                return restInterface.get('api/MemberDeposits/' + id);
            };
            this.getLoanCount = function () {
                var filter = {
                    "where": {"active": 1}
                };
                return restInterface.get('/api/Loans/count', null, filter);
            };
            this.getLoanTotal = function () {
                var filter = {
                    "where": {"active": 1},
                    "field": {"name": "amount"}
                };
                return restInterface.get('/api/Loans/total', null, filter);
            };
        }]);
});
