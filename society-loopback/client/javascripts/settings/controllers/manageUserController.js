define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service',
    'javascripts/common/services/rest-interface',
    'javascripts/admin/services/user-profile-service'
], function (angular, _) {
    angular.module("societyApp.settings.controller.manageUser", [
        "societyApp.common.services.gridService",
        'societyApp.common.services.restinterface',
        'societyApp.admin.services.userprofile'
    ])
        .controller('manageUserController', ['$scope', '$location', '$routeParams', '$filter', 'restInterface', 'gridService', 'SelectOptions',
            function ($scope, $location, $routeParams, $filter, restInterface, gridService, SelectOptions) {
                $scope.msg = {isCellEdited: false};

                $scope.manageUserGrid = gridService.getDefaultGridConfig([
                        {field: 'id'},
                        {field: 'memberid'},
                        {field: 'username'},
                        {field: 'email'},
                        {field: 'status', enableCellEdit: true, editableCellTemplate: 'ui-grid/dropdownEditor', cellFilter: 'mapUserStatus',
                            editDropdownValueLabel: 'label', editDropdownOptionsArray: SelectOptions.getUserStatusOptions()},
                        {field: 'role.role.id', displayName: 'Role', type: 'number', enableCellEdit: true, editableCellTemplate: 'ui-grid/dropdownEditor', cellFilter: 'mapUserRole',
                            editDropdownValueLabel: 'label', editDropdownOptionsArray: SelectOptions.getUserRoleOptions()}
                    ],
                    false,
                    {
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;
                            var that = this;
                            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                                if(newValue !== oldValue) {
                                    $scope.msg.lastCellEdited = 'edited setting:' + rowEntity.username + ' newValue:' + newValue + ' oldValue:' + oldValue;
                                    $scope.msg.isCellEdited = true;
                                    $scope.editedUserData = $scope.editedUserData || [];
                                    $scope.editedUserData.push(rowEntity);
                                    $scope.$apply();
                                }
                            });
                            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                that.selectedRowId = row.entity.id;
                                that.selectedRowName = row.entity.name;
                            });
                        }
                    });

                $scope.save = function save() {
                    var request = _.differenceWith($scope.editedUserData, $scope.userData, _.isEqual);
                    if(request.length > 0) {
                        var changedUserData = _.find($scope.userData, {id: request[0].id});
                        if (request[0].status !== changedUserData.status) {
                            restInterface.update('/api/users/' + changedUserData.id, {status: request[0].status}).then(function (data) {
                                console.log(data);
                            });
                        }
                        if (!(request[0].role && changedUserData.role) || (request[0].role && changedUserData.role && request[0].role.role.id !== changedUserData.role.role.id)) {
                            if(changedUserData.role){
                                restInterface.update('/api/users/change-role', {
                                    roleId: request[0].role.role.id,
                                    userId: changedUserData.id
                                }).then(function (data) {
                                    console.log(data);
                                });
                            } else{
                                restInterface.post('/api/users/change-role', {
                                    roleId: request[0].role.role.id,
                                    userId: changedUserData.id
                                }).then(function (data) {
                                    console.log(data);
                                });
                            }
                        }
                    }
                };
                $scope.showHistory = function showHistory(name) {
                }
                $scope.list = function list() {
                    var filter = {
                        "filter": {
                            //"where": {"status": '1'}
                        }
                    };
                    return restInterface.get('/api/users/list', null, filter).then(function (data) {
                        $scope.manageUserGrid.data = data;
                        $scope.userData = _.cloneDeep(data);
                        $scope.gridApi.core.handleWindowResize();
                    });
                };
                $scope.list();
            }]);
});