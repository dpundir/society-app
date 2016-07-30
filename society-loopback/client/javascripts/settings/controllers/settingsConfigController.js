define([
    'angular',
    'javascripts/common/services/grid-service',
    'javascripts/common/services/rest-interface'
], function () {
    angular.module("societyApp.settings.controller.settingsConfig", ["societyApp.common.services.gridService", 'societyApp.common.services.restinterface'])
        .controller('settingsConfigController', ['$scope', '$location', '$routeParams', '$filter', 'restInterface', 'gridService',
            function ($scope, $location, $routeParams, $filter, restInterface, gridService) {
                $scope.settingsConfigGrid = gridService.getDefaultGridConfig([
                    {field: 'name'},
                    {field: 'value'},
                    {field: 'description'}
                ], false, {
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                    }
                });

                $scope.save = function save() {
                    return restInterface.get('/api/SocietyConfigs').then(function () {

                    });
                };
                $scope.showHistory = function showHistory(name) {
                    name = name || 'maxDepositValue';
                    // pass type of the selected configuration
                    var filter = {
                        "filter": {
                            "where": {"name": name},
                            "order": ["expireDate DESC"]
                        }
                    };
                    return restInterface.get('/api/SocietyConfigs', null, filter).then(function (data) {
                        //data will be sorted in descending order of expire date
                        console.log(data);
                    });
                }
                $scope.detail = function detail() {
                    return restInterface.get('/api/SocietyConfigs').then(function (data) {
                        console.log(data);
                        $scope.settingsConfigGrid.data = data;
                        $scope.gridApi.core.handleWindowResize();
                    });
                };
                $scope.detail();
            }]);
});