/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/settings/controllers/settingsConfigController',
    'javascripts/settings/directives/settingsConfigHistory',
    'javascripts/settings/controllers/manageUserController'
],function(angular) {
    angular.module("societyApp.settings", [
      "societyApp.settings.controller.settingsConfig",
        "societyApp.settings.directives.settingsConfigHistory",
        "societyApp.settings.controller.manageUser"
    ]);
});