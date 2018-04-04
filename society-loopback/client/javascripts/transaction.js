define([
    'angular',
    'javascripts/transaction/controllers/transactionHistoryController',
    'javascripts/transaction/controllers/transactionAddController'
],function(angular) {
    angular.module("societyApp.transaction",[
        "societyApp.transaction.controllers.transactionHistory",
        "societyApp.transaction.controllers.transactionAdd"
    ]);
});