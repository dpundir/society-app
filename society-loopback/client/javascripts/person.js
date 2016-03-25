/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/person/services/personServices',
  'javascripts/person/controllers/personController'
],function(angular) {
    angular.module("societyApp.person",[
      "societyApp.person.services.detail",
      "societyApp.person.controllers.detail"
    ]);
});