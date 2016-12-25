define([
    'angular'
], function (angular, _) {
    angular.module("societyApp.member.filters", [])
        .filter('installmentFrequency',function(){
			var transactionHash = {
				12: 'Monthly',
				4: 'Quarterly',
				2: 'Half Yearly',
				1: 'Yearly'
			};
            return function(type){
				if (!type){
					return '';
				} else {
					return transactionHash[type];
				}
            }
        })
		.filter('transactionType',function(){
			var transactionHash = {
				1: 'CD',
				2: 'Loan',
				3: 'Share',
				4: 'Kalyan',
				5: 'Building',
				6: 'Admission',
				7: 'Installation'
			};
			return function(type){
				if (!type){
					return '';
				} else {
					return transactionHash[type];
				}
			}
		})
		.filter('identityFilter', function() {
			var identityHash = {
				1: 'Aadhar',
				2: 'PAN',
				3: 'Driving License',
				4: 'Voter ID',
				5: 'Passport'
			};

			return function(input) {
				if (!input){
					return '';
				} else {
					return identityHash[input];
				}
			};
		});
});
