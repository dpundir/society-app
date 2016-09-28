define([
    'angular',
    'javascripts/common/services/grid-service',
    'javascripts/common/services/rest-interface'
], function () {
    angular.module("societyApp.settings.controller.settingsConfig", ["societyApp.common.directives.audit", "societyApp.common.services.gridService", 'societyApp.common.services.restinterface'])
        .controller('settingsConfigController', ['$scope', '$location', '$routeParams', '$filter', 'restInterface', 'gridService',
            function ($scope, $location, $routeParams, $filter, restInterface, gridService) {
                $scope.settingsConfigHistoryGrid = {
                    options: {},
                    context: {}
                };
                $scope.successMsg = 'Configuration value saved successfully.';
                $scope.settingsConfigGrid = gridService.getDefaultGridConfig([
                        {field: 'name'},
                        {field: 'value'},
                        {field: 'description'}
                    ],
                    false,
                    {
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;
                            var that = this;

                            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                that.isEditClicked = false;
                                $scope.showSuccessMessage = false;
                                that.selectedRowObject = row.entity;
                            });
                        }
                    });
                $scope.settingsConfigGrid.isEditClicked = false;
                $scope.settingsConfigGrid.selectedRowObject = {};

                $scope.save = function save() {
                    var configObject = _.cloneDeep(_.find($scope.settingsConfigGrid.data, {id: $scope.settingsConfigGrid.selectedRowObject.id}));
                    configObject.value = $scope.settingsConfigGrid.selectedRowObject.newValue;
                    configObject.audit = $scope.settingsConfigGrid.selectedRowObject.audit;
                    delete configObject.newValue;
                    return restInterface.update('/api/SocietyConfigs', configObject).then(function (data) {
                        $scope.showSuccessMessage = true;
                        $scope.settingsConfigGrid.isEditClicked = false;
                        $scope.settingsConfigGrid.selectedRowObject = {};
                        init();
                    });
                };
                $scope.edit = function(){
                    this.settingsConfigGrid.isEditClicked = true;
                };
                $scope.showHistory = function showHistory(name) {
                    if (!this.settingsConfigGrid.selectedRowObject.id) {
                        return;
                    }
                    $scope.settingsConfigHistoryGrid.context.entityId = 9;
                    $scope.settingsConfigHistoryGrid.context.contextId = this.settingsConfigGrid.selectedRowObject.id;
                    $scope.settingsConfigHistoryGrid.options.openModal();
                };
                function init() {
                    var filter = {
                        "filter": {
                            "where": {"expireDate": null}
                        }
                    };
                    return restInterface.get('/api/SocietyConfigs', null, filter).then(function (data) {
                        $scope.settingsConfigGrid.data = data;
                        $scope.gridApi.core.handleWindowResize();
                    });
                }
                init();
            }]);
});
