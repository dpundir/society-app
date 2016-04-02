define([
    'angular',
    'javascripts/member/services/Member'
],function(){
    angular.module("societyApp.home.controller.home", ["societyApp.member.services.member"])
        .controller('homeController',['$scope','restInterface','MemberService',function($scope,restInterface,MemberService){
            restInterface.get('/api/SocietyConfigs').then(function(data){
                MemberService.setSocietyConfig(data);
            });
    }]);
});
