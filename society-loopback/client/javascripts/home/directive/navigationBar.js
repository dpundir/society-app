define([
    'angular'
], function () {
    angular.module("societyApp.home.directive.navigationbar", [])
        .directive('navBar',['$rootScope', '$location', 'AuthenticationService', 'restInterface', function ($rootScope, $location, AuthenticationService, restInterface) {
            return{
                restrict: 'A',
                scope:{
                    navBarConfig : '=config'
                },
                controller: ['$scope',function($scope){
                  $scope.logout = function(){
                    AuthenticationService.logout();
                  };
                  $scope.userProfile = function(){
                    restInterface.get('/api/users/detail').then(function(data){
                      console.log(data);
                      if(data.memberid){
                        $location.url('/member/view/'+data.memberid);
                      } else if(data.personId){
                        $location.url('/userprofile/view/'+data.personId);
                      }
                    });
                  }
                }],
                templateUrl:'javascripts/home/partials/nav-bar.html',
                link:function(){}
            }
        }]
    );
});