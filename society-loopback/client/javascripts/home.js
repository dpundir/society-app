/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/home/controllers/homeController',
  'javascripts/home/directive/accountTab',
  'javascripts/home/directive/dashBoardTile',
  'javascripts/home/directive/navigationBar'
],function() {
    angular.module("societyApp.home", [
      "societyApp.home.controller.home",
      "societyApp.home.directive.accounttab",
      "societyApp.home.directive.dashboardtile",
      "societyApp.home.directive.navigationbar"
    ]);
});