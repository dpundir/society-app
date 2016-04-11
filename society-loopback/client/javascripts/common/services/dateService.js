define([
    'angular',
    'jquery'
], function (angular, $) {
    angular.module("societyApp.common.services.dateService", [])
        .service('dateService', function () {
            this.dateConfig = function dateConfig(){
                var date = {
                    dateOption: {
                        formatYear: 'yy',
                        startingDay: 1,
                        format: 'dd-MM-yyyy'
                    },
                    format: 'dd-MM-yyyy',
                    status: {
                        startDateOpened: false,
                        endDateOpened: false
                    },
                    startDate:new Date(),
                    endDate:new Date()
                };
                return $.extend(true, {},date);
            }
        });
});