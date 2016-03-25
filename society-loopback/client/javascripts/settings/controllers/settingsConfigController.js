define([
    'angular',
    'javascripts/common/services/rest-interface'
], function () {
    angular.module("societyApp.settings.controller.settingsConfig", ['societyApp.common.services.restinterface'])
        .controller('settingsConfigController', ['$scope', '$location', '$routeParams', '$filter', 'restInterface',
            function ($scope, $location, $routeParams, $filter, restInterface) {
                $scope.settingsConfigGrid = {
                    enableSorting: false,
                    enableFiltering: false,
                    enableRowSelection: false,
                    enableRowHeaderSelection: false,
                    multiSelect : false,
                    modifierKeysToMultiSelect : false,
                    noUnselect : true,
                    paginationPageSizes: [15, 30, 45],
                    paginationPageSize: 15,
                    enableColumnMenus: false,
                    onRegisterApi: function(gridApi){
                        $scope.gridApi = gridApi;
                    },
                    columnDefs: [
                        {field: 'name'},
                        {field: 'value'},
                        {field: 'description'}
                    ],
                    data:[]
                };

                $scope.save = function save() {
                    return restInterface.get('/api/SocietyConfigs').then(function(){

                    });
                };
                $scope.showHistory = function showHistory(type){
                    // pass type of the selected configuration
                    var filter = {
                        "filter": {
                            "where": {"type": type}
                        }
                    };
                    return restInterface.get('/api/SocietyConfigs', null, filter).then(function(data){
                        //data will be sorted in descending order of expire date
                        console.log(data);
                    });
                }
                $scope.detail = function detail() {
                    return restInterface.get('/api/SocietyConfigs').then(function(data){
                        console.log(data);
                        $scope.settingsConfigGrid.data = data;
                        $scope.gridApi.core.handleWindowResize();
                    });
                };
                $scope.detail();
            }]);
});