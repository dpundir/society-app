define([
    'angular',
    'lodash',
    'javascripts/member/services/Member',
    'javascripts/common/services/grid-service'
], function (angular,_) {
    angular
        .module("societyApp.member.controller.memberlist", ["societyApp.member.services.member", "societyApp.common.services.gridService"])
        .controller('memberListController',
        ['$scope', '$parse', 'MemberService','$location','uiGridConstants', 'gridService',
            function ($scope, $parse, MemberService, $location, uiGridConstants, gridService) {
                var member = [];
                $scope.error = {
                    showErrorMsg: false,
                    errorMsg:''
                };
                $scope.filterText = 'Show filter';
                $scope.memberListGrid = gridService.getDefaultGridConfig([
                    {field: 'id', enableHiding: false, enableFiltering: false},
                    {field: 'person.firstName', displayName: 'First Name', enableHiding: false},
                    {field: 'person.middleName', displayName: 'Middle Name', enableHiding: false},
                    {field: 'person.lastName', displayName: 'Last Name', enableHiding: false},
                    {field: 'person.phone', displayName: 'Phone', enableHiding: false},
					{field: 'person.aadharNumber', displayName: 'Aadhar Number', enableHiding: false, enableFiltering: false}
                ], true, {
                    onRegisterApi: function(gridApi){
                        $scope.gridApi = gridApi;
                        var that = this;
                        gridApi.selection.on.rowSelectionChanged($scope,function(row){
                            that.selectedRowId = row.entity.id;
                        });
						$scope.gridApi.core.on.filterChanged($scope, function() {
							var grid = this.grid,
								refEntity;

							that.filter = {};
							_.forEach(grid.columns, function(column) {
								if(column.filters[0].term) {
									refEntity = $parse(column.field);
									refEntity.assign(that.filter, {"regexp": column.filters[0].term});
								}
							});
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
				$scope.search = function() {
					var filter;

					if ($scope.memberListGrid.filter && $scope.memberListGrid.filter.person) {
						filter = {
							filter: {
								include: {
									scope: {
										where: $scope.memberListGrid.filter.person
									}
								}
							}
						};
					}
					MemberService.list(filter).then(function (data) {
						$scope.memberListGrid.data = _.filter(data, function(member){
							if(member.person) {
								_.forEach(member.person.identities, function(identity) {
									if (identity.type === 1) {
										member.person.aadharNumber = identity.identityNumber;
									}
								});
							}
							return !!member.person;
						});
					});
				}
            }]);
});