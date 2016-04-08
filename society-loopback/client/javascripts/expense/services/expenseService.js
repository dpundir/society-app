define([
    'angular'
], function (angular) {
    angular.module("societyApp.expense.services.expenseListService", ['ngStorage'])
        .service('expenseListService', ['$http', '$q', 'restInterface','$localStorage', function ($http, $q, restInterface,$localStorage) {
            this.list = function list(filter) {
                var defaultSocietyExpenseListFilter = {
                    "filter": {
                    }
                };
                filter = angular.merge(filter || {}, defaultSocietyExpenseListFilter);
                return restInterface.get('/api/SocietyExpenses', null, filter);
            };
            this.addExpenseIncome = function addExpenseIncome(expense){
                return restInterface.post('/api/SocietyExpenses', expense);
            };
        }]);
});
