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

        }).controller("appController", ['$rootScope', '$scope', function ($rootScope, $scope) {
            $scope.heading = 'Application Heading';
            $scope.ngViewPlaceholder = 'NG View Placeholder';
            $scope.footer = 'Footer';
            $scope.navBarConfig = {
                showNavBar: false
            };
        }]);

    angular.bootstrap(document, ["societyApp"]);
});