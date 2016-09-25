define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service'
], function (angular, _) {
    angular.module("societyApp.settings.directives.settingsConfigHistory", ["societyApp.common.services.gridService"])
        .directive('settingsConfigHistory', ['$uibModal', 'gridService', function ($uibModal, gridService) {
            return{
                restrict: 'EA',
                scope: {
                    options: '=',
                    history: '='
                },
                controller: ['$scope', settingsConfigHistoryController],
                link: function () {
                }
            };
            function settingsConfigHistoryController($scope) {
                $scope.options = $scope.options || {};
                $scope.settingsConfigHistoryGrid = gridService.getDefaultGridConfig([
                    {field: 'oldValue'},
                    {field: 'newValue'},
                    {field: 'description'},
                    {field: 'createDate'}
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
                        templateUrl: 'javascripts/settings/partials/settingsConfigHistory.html',
                        backdrop: 'true',
                        size: 'lg',
                        scope: $scope
                    });
                };
                $scope.ok = function () {
                    modalInstance.close();
                };
                $scope.$watch('history', function(newValue){
                    $scope.settingsConfigHistoryGrid.data = $scope.history;
                });
            }
        }]);
});
