/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/settings/controllers/settingsConfigController',
    'javascripts/common/directives/audit-directive',
    'javascripts/settings/controllers/manageUserController'
],function(angular) {
    angular.module("societyApp.settings", [
      "societyApp.settings.controller.settingsConfig",
        "societyApp.common.directives.audit",
        "societyApp.settings.controller.manageUser"
    ]);
});