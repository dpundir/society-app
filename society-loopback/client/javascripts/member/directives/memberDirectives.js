define([
    'angular'
], function () {
    angular.module("societyApp.member.directives",[])
        .directive('member-details',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{
                    member : '=',
                    memberAddress: '=',
                    editable:'@'
                },
                controller: ['$scope',function($scope){
                }],
                templateUrl:'javascripts/member/partials/memberDetails.html',
                link:function(){}
            }
        }])
        .directive('member-address',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{
                    address : '=',
                    editable:'@'
                },
                controller: ['$scope',function($scope){
                }],
                templateUrl:'javascripts/member/partials/memberAddress.html',
                link:function(){}
            }
        }])
        .directive('member-deposit',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{

                },
                controller: ['$scope',function($scope){
                }],
                templateUrl:'javascripts/member/partials/memberDeposit.html',
                link:function(){}
            }
        }])
        ..directive('member-loan',['$rootScope',function ($rootScope) {
            return{
                restrict: 'A',
                scope:{

                },
                controller: ['$scope',function($scope){
                }],
                templateUrl:'javascripts/member/partials/memberLoan.html',
                link:function(){}
            }
        }]
    );
});