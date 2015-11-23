/**
 * Created by Deepak.Pundir on 11/1/2015.
 */
define([
    'angular',
    'bootstrap',
    'angular-resource',
    'angular-route',
    'angular-animate',
    'angular-ui-bootstrap',
    'javascripts/home/controllers/homeController',
    'javascripts/home/directive/navigationBar',
    'javascripts/home/directive/dashBoardTile',
    'javascripts/home/directive/accountTab',
    'javascripts/admin/controllers/adminLoginController',
    'javascripts/member/controllers/memberRegistrationController'
], function(angular) {
    var app = angular.module("societyApp", [
        "ngRoute",
        "ui.bootstrap",
        "societyApp.home",
        "societyApp.admin",
        "societyApp.member"
    ])
        .config(function ($routeProvider, $provide) {
            $provide.value('$context', {});
            $provide.value('$serverPath', window.location.origin);

            $routeProvider.when('/member', {
                'templateUrl' : 'javascripts/member/partials/member.html'
            }).when('/member-registration', {
                'templateUrl': 'javascripts/member/partials/member-registration.html',
                'controller': 'memberRegistrationController'
            }).when('/society', {
                'templateUrl': 'javascripts/society/partials/society.html'
            }).when('/home', {
                'templateUrl': 'javascripts/home/partials/home.html',
                'controller':'homeController'
            }).when('/admin-login', {
                'templateUrl': 'javascripts/admin/partials/admin-login.html',
                'controller': 'adminLoginController'
            }).otherwise({
                'redirectTo': '/admin-login'
            });

        }).controller("appController",['$rootScope','$scope', function($rootScope, $scope) {
            $scope.heading = 'Application Heading';
            $scope.ngViewPlaceholder = 'NG View Placeholder';
            $scope.footer = 'Footer';
            $scope.navBarConfig = {
                showNavBar : false
            };
        }]);

    angular.bootstrap(document, ["societyApp"]);
});