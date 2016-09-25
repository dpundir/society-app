define([
    'angular',
    'javascripts/member/services/Member'
],function(){
    angular.module("societyApp.home.controller.home", ["societyApp.member.services.member"])
        .controller('homeController',['$scope', '$cookies', 'restInterface','MemberService',function($scope,$cookies,restInterface,MemberService){
            $scope.roleName = $cookies.getObject('user').roleName;
            if($scope.roleName != 'member') {
                restInterface.get('/api/SocietyConfigs').then(function (data) {
                    MemberService.setSocietyConfig(data);
                });
            }
    }]);
});
