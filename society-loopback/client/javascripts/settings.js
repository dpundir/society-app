/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/settings/controllers/settingsConfigController',
    'javascripts/settings/directives/settingsConfigHistory'
],function(angular) {
    angular.module("societyApp.settings", [
      "societyApp.settings.controller.settingsConfig",
        "societyApp.settings.directives.settingsConfigHistory"
    ]);
});