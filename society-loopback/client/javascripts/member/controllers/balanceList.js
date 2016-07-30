define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service',
    'javascripts/member/services/Member'
], function (angular,_) {
    angular
        .module("societyApp.member.controller.balancelist", ["societyApp.common.services.gridService", "societyApp.member.services.member"])
        .controller('memberBalanceController',
        ['$scope', 'MemberService','$location','uiGridConstants', 'gridService',
            function ($scope, MemberService, $location, uiGridConstants, gridService) {
                var member = [];
                $scope.error = {
                    showErrorMsg: false,
                    errorMsg:''
                };
                $scope.filterText = 'Show filter';
                $scope.memberListGrid = gridService.getDefaultGridConfig([
                    {field: 'id', enableHiding: false},
                    {field: 'firstName', enableHiding: false},
                    {field: 'middleName', enableHiding: false},
                    {field: 'lastName', enableHiding: false},
                    {field: 'phoneNo', enableHiding: false},
                    {field: 'deposit', enableHiding: false}
                ], true, {
                    onRegisterApi: function(gridApi){
                        $scope.gridApi = gridApi;
                        var that = this;
                        gridApi.selection.on.rowSelectionChanged($scope,function(row){
                            that.selectedRowId = row.entity.id;
                        });
                    }
                });
                $scope.toggleFilter = function(){
                    $scope.memberListGrid.enableFiltering = !$scope.memberListGrid.enableFiltering;
                    if($scope.memberListGrid.enableFiltering){
                        $scope.filterText = 'Hide filter';
                    }else{
                        $scope.filterText = 'Show filter';
                    }
                    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                };
                MemberService.list().then(function (data) {
                    var join = Array.prototype.join,
                        peopleList = null;
                    _.forEach(data,function(people){
                        peopleList = {};
                        peopleList.id = people.id;
                        peopleList.firstName = people.fname;
                        peopleList.middleName = people.mname;
                        peopleList.lastName = people.lname;
                        peopleList.phoneNo = people.phone;
                        peopleList.deposit = people.deposit;
                        member.push(peopleList);
                    });
                    $scope.memberListGrid.data  = member;
                    peopleList = null;
                });
            }]);
});