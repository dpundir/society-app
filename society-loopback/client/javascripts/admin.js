/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/common/services/authentication',
  'javascripts/common/services/http-interceptor',
  'javascripts/common/services/rest-interface',
  'javascripts/admin/services/user-profile-service',
  'javascripts/admin/controllers/adminLoginController',
  'javascripts/admin/controllers/register-controller',
  'javascripts/admin/controllers/reset-password-controller',
  'javascripts/admin/controllers/user-profile-controller'
], function () {
    angular.module("societyApp.admin",[
      "societyApp.common.services.authentication",
      "societyApp.common.services.httpinterceptor",
      "societyApp.common.services.restinterface",
      "societyApp.admin.services.userprofile",
      "societyApp.admin.controller.login",
      "societyApp.admin.controller.register",
      "societyApp.admin.controller.reset",
      "societyApp.admin.controller.userprofile"
    ]);
});
