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
        });
});
