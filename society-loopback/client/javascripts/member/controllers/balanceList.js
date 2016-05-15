define([
    'angular',
    'lodash',
    'javascripts/member/services/Member'
], function (angular,_) {
    angular
        .module("societyApp.member.controller.balancelist", ["societyApp.member.services.member"])
        .controller('memberBalanceController',
        ['$scope', 'MemberService','$location','uiGridConstants',
            function ($scope, MemberService, $location, uiGridConstants) {
                var member = [];
                $scope.error = {
                    showErrorMsg: false,
                    errorMsg:''
                };
                $scope.filterText = 'Show filter';
                $scope.memberListGrid = {
                    enableSorting: false,
                    enableFiltering: false,
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    multiSelect : false,
                    modifierKeysToMultiSelect : false,
                    noUnselect : true,
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25,
                    enableColumnMenus: false,
                    onRegisterApi: function(gridApi){
                        $scope.gridApi = gridApi;
                        var that = this;
                        gridApi.selection.on.rowSelectionChanged($scope,function(row){
                            that.selectedRowId = row.entity.id;
                        });
                    },
                    columnDefs: [
                        {field: 'id'},
                        {field: 'firstName'},
                        {field: 'middleName'},
                        {field: 'lastName'},
                        {field: 'phoneNo'},
                        {field: 'deposit'}
                    ],
                    data:[],
                    selectedRowId:null
                };
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