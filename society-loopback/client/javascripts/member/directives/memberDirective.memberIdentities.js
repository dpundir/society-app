/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service'
], function (angular, _) {
    angular.module("societyApp.member.directives.memberIdentities", [
        "ui.grid",
        "ui.grid.selection",
        "ui.grid.pagination",
        "ui.grid.exporter",
        'societyApp.common.services.gridService'])
        .directive('memberIdentities', ['$location', '$filter', '$q', 'MemberService', 'SelectOptions', 'uiGridConstants', 'gridService',
			function ($location, $filter, $q, MemberService, SelectOptions, uiGridConstants, gridService) {
				return {
					restrict: 'A',
					scope: {
						personId: '=',
						memberIdentities: '=',
						clickHandler: '&'
					},
					controller: ['$scope', 'gridService', function ($scope, gridService) {

						function initIdentityDetails() {
							$scope.identityOptions = SelectOptions.getIdentityOptions();
							$scope.identityDetail = {
								id: '',
								personId: $scope.personId,
								type: '',
								identityNumber: '',
								startDate: '',
								endDate: ''
							};
						}

						function validateIdentityDetails(identityDetail) {
							return true;
						}
						$scope.IDENTITY_MODE = {
							VIEW: false,
							NEW: false
						};

						$scope.memberIdentities = $scope.memberIdentities || {};
						$scope.filterText = 'Show filter';
						$scope.showIdentitySection = false;
						$scope.error = {
							errorText: '',
							isError: false
						};
						$scope.openStartdate = function () {
							$scope.date.status.startDateOpened = !$scope.date.status.startDateOpened;
						};
						$scope.openEnddate = function () {
							$scope.date.status.endDateOpened = !$scope.date.status.endDateOpened;
						};
						$scope.date = {
							dateOption: {
								formatYear: 'yy',
								startingDay: 1,
								format: 'dd-MM-yyyy'
							},
							format: 'dd-MM-yyyy',
							status: {
								startDateOpened: false,
								endDateOpened: false
							},
							startDate: new Date(),
							endDate: new Date()
						};
						$scope.memberIdentitiesGrid = gridService.getDefaultGridConfig(
							[
								{field: 'id', enableHiding: false},
								{field: 'type', enableHiding: false, cellFilter: 'identityFilter'},
								{field: 'identityNumber', enableHiding: false},
								{field: 'startDate', enableHiding: false},
								{field: 'endDate', enableHiding: false}
							], true, {
								onRegisterApi: function (gridApi) {
									$scope.gridApi = gridApi;
									var self = this;
									gridApi.selection.on.rowSelectionChanged($scope, function (row) {
										self.selectedRowId = row.entity.id;
									});
								}
							});
						$scope.memberIdentities.successCB = function (data) {
							var memberIdentities = [];
							_.forEach(data, function (identity) {
								var memberIdentity = {};
								memberIdentity.id = identity.id;
								memberIdentity.type = identity.type;
								memberIdentity.identityNumber = identity.identityNumber;
								memberIdentity.personId = identity.personId;
								memberIdentity.startDate = $filter('date')(identity.startDate, $scope.date.format);
								memberIdentity.endDate = $filter('date')(identity.endDate, $scope.date.format);
								memberIdentities.push(memberIdentity);
							});

							$scope.memberIdentitiesGrid.data = memberIdentities;
							$scope.gridApi.core.handleWindowResize();
							$scope.showIdentitySection = false;
							initIdentityDetails();
						};
						$scope.memberIdentities.errorCB = function () {

						};
						$scope.showFilter = function () {
							$scope.memberIdentitiesGrid.enableFiltering = !$scope.memberIdentitiesGrid.enableFiltering;
							if ($scope.memberIdentitiesGrid.enableFiltering) {
								$scope.filterText = 'Hide filter';
							} else {
								$scope.filterText = 'Show filter';
							}
							$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
						};
						$scope.newIdentity = function () {
							$scope.IDENTITY_MODE.NEW = true;
							$scope.IDENTITY_MODE.VIEW = false;
							$scope.showIdentitySection = true;
							$scope.identitySectionHeading = 'New Identity';
							initIdentityDetails();
						};
						$scope.addNewIdentity = function () {
							if (!validateIdentityDetails($scope.identityDetail)) {
								return;
							}
							var identityDetail = angular.copy($scope.identityDetail);
							MemberService.addNewIdentity(identityDetail).then(function (data) {
								console.log(data);
								$scope.showIdentitySection = false;
								$scope.refreshGrid();
							}, function (error) {
								console.log(error);
							});
						};
						$scope.deleteIdentity = function () {
							if (!$scope.memberIdentitiesGrid.selectedRowId) {
								return;
							}
							MemberService.deleteIdentity($scope.memberIdentitiesGrid.selectedRowId).then(function (data) {
								console.log(data);
								$scope.showIdentitySection = false;
								$scope.refreshGrid();
							}, function (error) {
								console.log(error);
							});
						};
						$scope.refreshGrid = function(){
							MemberService.getMemberIdentities($scope.personId).then(function (data) {
								$scope.memberIdentities.successCB(data);
							}, function (error) {
								$scope.memberIdentities.errorCB(error);
							});
						};
						initIdentityDetails();
					}],
					templateUrl: 'javascripts/member/partials/memberIdentities.html',
					link: function () {
					}
				}
        }])
});