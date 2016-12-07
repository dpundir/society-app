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
                    {field: 'person.firstName', displayName: 'First Name', enableHiding: false},
                    {field: 'person.middleName', displayName: 'Middle Name', enableHiding: false},
                    {field: 'person.lastName', displayName: 'Last Name', enableHiding: false},
                    {field: 'person.phone', displayName: 'Phone', enableHiding: false},
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
                    $scope.memberListGrid.data  = data;
                    peopleList = null;
                });
            }]);
});