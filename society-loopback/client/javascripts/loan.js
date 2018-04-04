/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/common/services/authentication',
  'javascripts/common/services/http-interceptor',
  'javascripts/common/services/rest-interface',
    'javascripts/loan/controllers/loanSearchController'
], function () {
    angular.module("societyApp.loan",[
      "societyApp.common.services.authentication",
      "societyApp.common.services.httpinterceptor",
      "societyApp.common.services.restinterface",
        "societyApp.loan.controllers.loansearch"
    ]);
});
