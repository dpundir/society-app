define([
    'angular',
    'lodash',
    'javascripts/common/services/dateService',
    'javascripts/common/services/grid-service',
    'javascripts/common/services/rest-interface'
], function (angular, _) {
    angular.module("societyApp.common.directives.audit", ["societyApp.common.services.dateService", "societyApp.common.services.gridService", "societyApp.common.services.restinterface"])
        .directive('audit', ['$uibModal', 'gridService', 'dateService', 'restInterface', function ($uibModal, gridService, dateService, restInterface) {
            return{
                restrict: 'EA',
                scope: {
                    options: '=',
                    context: '='
                },
                controller: ['$scope', auditController],
                link: function () {
                }
            };
            function auditController($scope) {
                $scope.context = $scope.context || {};
                $scope.options = $scope.options || {};
                $scope.auditGrid = gridService.getDefaultGridConfig([
                    {field: 'oldValue'},
                    {field: 'newValue'},
                    {field: 'description'},
                    {field: 'fieldName', displayName: 'Attributes Changed'},
                    {field: 'createDate', displayName: 'Activity Date', type: 'date', cellFilter: 'date:"'+dateService.dateConfig().format+'"'}
                ], false, {
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                        var that = this;
                        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                            that.selectedRowId = row.entity.id;
                        });
                    }
                });
                var modalInstance;
                $scope.options.openModal = function () {
                    $scope.options.searchModel = '';
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'javascripts/common/partials/audit.html',
                        backdrop: 'true',
                        size: 'lg',
                        scope: $scope
                    });
                    $scope.getData();
                };
                $scope.ok = function () {
                    modalInstance.close();
                };

                $scope.getData = function(){
                    // pass type of the selected configuration
                    var filter = {
                        "filter": {
                            "where": {
                                "entityId": $scope.context.entityId,
                                "contextId": $scope.context.contextId
                            },
                            "order": ["createDate DESC"]
                        }
                    };
                    return restInterface.get('/api/Audits', null, filter).then(function (data) {
                        //data will be sorted in descending order of expire date
                        $scope.auditGrid.data = data;
                    });
                }
            }
        }]);
});
