define([
  'angular'
], function () {
  angular.module("societyApp.admin", [])
    .controller('adminLoginController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
      $scope.adminLogin = function () {
        $scope.config.hideHeader = false;
        $scope.config.hideFooter = false;
        $location.url('/member-registration');
      }
      $scope.config.hideHeader = true;
      $scope.config.hideFooter = true;
    }]);
});