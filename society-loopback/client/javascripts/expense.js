/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/expense/services/expenseService',
  'javascripts/expense/controllers/expenseController'
],function(angular) {
    angular.module("societyApp.expense",[
      "societyApp.expense.services.expenseListService",
      "societyApp.expense.controllers.expenseListController"
    ]);
});