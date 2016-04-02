define([
    'angular'
], function (angular, _) {
    angular.module("societyApp.member.filters", [])
        .filter('transactionType',function(){
            return function(type){
                if(type === 1){
                    return 'Saving'
                }else{
                    return 'Loan'
                }
            }
        })
        .filter('frequency',function(){
            return function(value){
                var installmentFreq = {
                  12: 'Monthly',
                  6: 'Half yearly',
                  3: 'Quarterly',
                  1: 'Yearly'
                };
                return installmentFreq[value];
            }
        })
});
