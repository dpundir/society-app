define(['angular', 'bootstrap'], function(angular){
    'use strict';
    angular.module("societyApp.common.directives.commonDirectives", ['ui.bootstrap'])
        .directive('messageModal', function($uibModal) {
            return {
                restrict: 'EA',
                scope: {
                    message: '=',
                    action: '&'
                },
                controller: function($scope){
                    var modalInstance;
                    $scope.primaryAction = function () {
                        $scope.action();
                        modalInstance.close();
                    };

                    $scope.secondaryAction = function () {
                        modalInstance.dismiss('cancel');
                    };
                    $scope.message = angular.extend({
                        type: 'information',
                        showPrimary: true,
                        showSecondary: true,
                        textHeader: 'Message',
                        textPrimary: 'Ok',
                        textSecondary: 'Cancel',
                        size: 'sm'
                    }, $scope.message);

                    $scope.message.showPrimary = !!$scope.message.showPrimary;
                    $scope.message.showSecondary = !!$scope.message.showSecondary;

                    if($scope.message.type == 'information' || $scope.message.type == 'error'){
                        $scope.message.showSecondary = false;
                    }

                    $scope.message.openModal = function () {
                        modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'javascripts/common/partials/message-modal.html',
                            backdrop:'true',
                            size: $scope.message.size,
                            scope:$scope
                        });
                    };
                }
            };
        });
});
