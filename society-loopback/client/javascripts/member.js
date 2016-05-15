/**
 * Created by debashis.mishra on 12/1/2015.
 */
define([
    'angular',
  'javascripts/member/services/Member',
  'javascripts/member/controllers/memberList',
    'javascripts/member/controllers/balanceList',
  'javascripts/member/controllers/memberController'
],function(angular) {
    angular.module("societyApp.member",[
      "societyApp.member.services.member",
      "societyApp.member.controller.memberlist",
        "societyApp.member.controller.balancelist",
      "societyApp.member.controller.memberregistration"
    ]);
});