define([
    'angular',
    'jquery'
], function (angular, $) {
    angular.module("societyApp.common.services.validationService", [])
        .service('validationService', function () {
            this.getPhoneNumberPattern = function () {
                return /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
            };
        });
});