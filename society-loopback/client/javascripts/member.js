/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/member/services/Member',
    'javascripts/common/services/printService',
  'javascripts/member/controllers/memberList',
    'javascripts/member/controllers/balanceList',
  'javascripts/member/controllers/memberController'
],function(angular) {
    angular.module("societyApp.member",[
      "societyApp.member.services.member",
        "societyApp.common.services.printService",
      "societyApp.member.controller.memberlist",
        "societyApp.member.controller.balancelist",
      "societyApp.member.controller.memberregistration"
    ]);
});