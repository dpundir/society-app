define([
    'angular',
    'lodash',
    'javascripts/common/services/grid-service'
], function (angular, _) {
    angular.module("societyApp.member.memberSearchDirective", ["societyApp.common.services.gridService"])
        .directive('memberSearch', ['MemberService', '$uibModal', 'gridService', function (MemberService, $uibModal, gridService) {
            return {
                restrict: 'EA',
                scope: {
                    option: '='
                },
                controller: ['$scope', memberSearchController],
                link: function () {
                }
            };
            function memberSearchController($scope) {
                $scope.option = $scope.option || {};
                $scope.error = {
                    errorText: '',
                    isError: false
                };
                $scope.memberListSearchGrid = gridService.getDefaultGridConfig([
                    {field: 'member.id', displayName: 'Id'},
                    {field: 'fname', displayName: 'First name'},
                    {field: 'mname', displayName: 'Middle name'},
                    {field: 'lname', displayName: 'Last name'}
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
                $scope.option.openModal = function () {
                    $scope.option.searchModel = '';
                    $scope.error.isError = false;
                    $scope.memberListSearchGrid.data = [];
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'javascripts/member/partials/memberSearch.html',
                        backdrop: 'true',
                        size: 'lg',
                        scope: $scope
                    });
                };
                $scope.keyDown = function(event){
                    if(event.which === 13){
                        $scope.search();
                    }
                };
                $scope.search = function () {
                    MemberService.listWithSearchString($scope.option.searchModel).then(function (data) {
                        data = _.filter(data, function(people){
                            return people.member && people.member.id !== $scope.option.memberId;
                        });
                        if (!data.length) {
                            $scope.error.isError = true;
                            $scope.error.errorText = 'No result found, please refine your search.'
                        } else {
                            $scope.error.isError = false;
                        }
                        $scope.memberListSearchGrid.data = data;
                    });
                };
                $scope.ok = function () {
                    if (!$scope.memberListSearchGrid.selectedRowId) {
                        $scope.error.isError = true;
                        $scope.error.errorText = 'Please select a row.';
                        return;
                    }
                    $scope.option.onSelectRow($scope.memberListSearchGrid.selectedRowId);
                    modalInstance.close();
                };
                $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                }
            }
        }]);
});
