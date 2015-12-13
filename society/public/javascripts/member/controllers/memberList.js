define([
    'angular',
    'javascripts/member/services/Member'
], function () {
    angular
        .module("societyApp.member")
        .controller('memberListController',
        ['$scope', 'MemberService',
            function ($scope, MemberService) {
                $scope.people = [
                    {
                        name: 'Debashis Mishra',
                        address:'C-1431,lal bagh,loni,ghaziabad,uttar pradesh',
                        img: 'image/default-emp.jpg',
                        deposit: '20,000'
                    },
                    {
                        name: 'Deepak Pundir',
                        address:'C-1431,lal bagh,loni,ghaziabad,uttar pradesh',
                        img: 'image/default-emp.jpg',
                        deposit: '20,000'
                    },
                    {
                        name: 'Neeraj Kumar',
                        address:'C-1431,lal bagh,loni,ghaziabad,uttar pradesh',
                        img: 'image/default-emp.jpg',
                        deposit: '20,000'
                    }
                ];
                $scope.header = [
                    {
                        label: '',
                        type: 'img'
                    },
                    {
                        label: 'Name'
                    },
                    {
                        label: 'Address'
                    },
                    {
                        label: 'Total deposit'
                    }
                ];
                $scope.activeActions = function(empId){

                };
            }]);
});