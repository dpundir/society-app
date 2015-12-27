/**
 * Created by Deepak.Pundir on 11/1/2015.
 */
define([
    'angular',
    'bootstrap',
    'angular-cookies',
    'angular-resource',
    'angular-route',
    'angular-animate',
    'angular-aria',
    'angular-ui-bootstrap',
    'ngStorage',
    'javascripts/admin',
    'javascripts/member',
    'javascripts/home'
], function (angular) {
    var app = angular.module("societyApp", [
        "ngRoute",
        "ngCookies",
        "ngStorage",
        "ui.bootstrap",
        "societyApp.home",
        "societyApp.admin",
        "societyApp.member"
    ])
        .config(function ($routeProvider, $provide) {
            $provide.value('$context', {});
            $provide.value('$serverPath', window.location.origin);

            $routeProvider.when('/member/:action/:id?', {
                'templateUrl': 'javascripts/member/partials/member.html',
                'controller': 'memberRegistrationController'
            }).when('/member-list', {
                'templateUrl': 'javascripts/member/partials/member-list.html',
                'controller': 'memberListController'
            }).when('/home', {
                'templateUrl': 'javascripts/home/partials/home.html',
                'controller': 'homeController'
            }).when('/login/:action?', {
                'templateUrl': 'javascripts/admin/partials/login.html',
                'controller': 'adminLoginController'
            }).when('/register/:message', {
                'templateUrl': 'javascripts/admin/partials/register-message.html',
                'controller': 'registerController'
            }).otherwise({
                'redirectTo': '/login'
            });

        }).controller("appController", ['$rootScope', '$scope', 'AuthenticationService', '$location',
            function ($rootScope, $scope, AuthenticationService, $location) {
            $scope.heading = 'Application Heading';
            $scope.ngViewPlaceholder = 'NG View Placeholder';
            $scope.footer = 'Footer';
            $scope.navBarConfig = {
                showNavBar: false
            };
            $rootScope.$on('$locationChangeStart',function(event, newUrl, oldUrl, newState, oldState){
                if(!AuthenticationService.isAuthenticated()){
                    $scope.navBarConfig.showNavBar = false;
                    if(newUrl.indexOf('login/reset') === -1 && newUrl.indexOf('login/register') === -1) {
                        $location.url('/login');
                    }
                }else{
                    if(newUrl.indexOf('/login') > -1){
                        $location.url('/home');
                    }
                    $scope.navBarConfig.showNavBar = true;
                }
            });
        }]);

    angular.bootstrap(document, ["societyApp"]);
});