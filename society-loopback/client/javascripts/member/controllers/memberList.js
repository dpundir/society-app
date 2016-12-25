define([
    'angular',
    'lodash',
    'javascripts/member/services/Member',
    'javascripts/common/services/grid-service'
], function (angular,_) {
    angular
        .module("societyApp.member.controller.memberlist", ["societyApp.member.services.member", "societyApp.common.services.gridService"])
        .controller('memberListController',
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
					{field: 'person.aadharNumber', displayName: 'Aadhar Number', enableHiding: false}
                ], true, {
                    onRegisterApi: function(gridApi){
                        $scope.gridApi = gridApi;
                        var that = this;
                        gridApi.selection.on.rowSelectionChanged($scope,function(row){
                            that.selectedRowId = row.entity.id;
                        });
                    }
                });
                $scope.memberListGrid =  $.extend(true, $scope.memberListGrid, gridService.getDefaultPrintConfig());
                $scope.toggleFilter = function(){
                    $scope.memberListGrid.enableFiltering = !$scope.memberListGrid.enableFiltering;
                    if($scope.memberListGrid.enableFiltering){
                        $scope.filterText = 'Hide filter';
                    }else{
                        $scope.filterText = 'Show filter';
                    }
                    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                };
                $scope.showDetails = function () {
                    if(!$scope.memberListGrid.selectedRowId){
                        $scope.error.showErrorMsg = true;
                        $scope.error.errorMsg = 'Please select a member to see details.'
                        return;
                    }
                    $location.url('/member/view/'+$scope.memberListGrid.selectedRowId);
                };
                MemberService.list().then(function (data) {
					_.forEach(data, function(member){
						_.forEach(member.person.identities, function(identity){
							if(identity.type === 1) {
								member.person.aadharNumber = identity.identityNumber;
							}
						});
					});
                    $scope.memberListGrid.data  = data;
                });
            }]);
});