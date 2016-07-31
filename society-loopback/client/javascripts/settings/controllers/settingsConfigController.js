define([
    'angular',
    'javascripts/common/services/grid-service',
    'javascripts/common/services/rest-interface'
], function () {
    angular.module("societyApp.settings.controller.settingsConfig", ["societyApp.common.services.gridService", 'societyApp.common.services.restinterface'])
        .controller('settingsConfigController', ['$scope', '$location', '$routeParams', '$filter', 'restInterface', 'gridService',
            function ($scope, $location, $routeParams, $filter, restInterface, gridService) {
                $scope.settingsConfigHistoryGrid = {
                    options: {},
                    history: []
                };
                $scope.msg = {isCellEdited: false};

                $scope.settingsConfigGrid = gridService.getDefaultGridConfig([
                        {field: 'name'},
                        {field: 'value', enableCellEdit: true, type: 'number'},
                        {field: 'description'}
                    ],
                    false,
                    {
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;
                            var that = this;
                            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
                                $scope.msg.lastCellEdited = 'edited setting:' + rowEntity.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
                                $scope.msg.isCellEdited = true;
                                $scope.$apply();
                            });
                            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                that.selectedRowId = row.entity.id;
                                that.selectedRowName = row.entity.name;
                            });
                        }
                    });

                $scope.save = function save() {
                    return restInterface.get('/api/SocietyConfigs').then(function () {

                    });
                };
                $scope.showHistory = function showHistory(name) {
                    if(!$scope.settingsConfigGrid.selectedRowId){
                        return;
                    }
                    // pass type of the selected configuration
                    var filter = {
                        "filter": {
                            "where": {"name": name},
                            "order": ["createDate DESC"]
                        }
                    };
                    return restInterface.get('/api/SocietyConfigs', null, filter).then(function (data) {
                        //data will be sorted in descending order of expire date
                        $scope.settingsConfigHistoryGrid.history = data;
                        $scope.settingsConfigHistoryGrid.options.openModal();
                    });
                }
                $scope.list = function list() {
                    var filter = {
                        "filter": {
                            "where": {"expireDate": null}
                        }
                    };
                    return restInterface.get('/api/SocietyConfigs', null, filter).then(function (data) {
                        $scope.settingsConfigGrid.data = data;
                        $scope.gridApi.core.handleWindowResize();
                    });
                };
                $scope.list();
            }]);
});