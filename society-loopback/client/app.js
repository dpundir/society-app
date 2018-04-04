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
    'angular-ui-grid',
    'ngStorage',
    'javascripts/admin',
    'javascripts/member',
    'javascripts/home',
    'javascripts/loan',
    'javascripts/person',
    'javascripts/expense',
    'javascripts/settings',
    'javascripts/transaction'
], function (angular) {
    var app = angular.module("societyApp", [
        "ngRoute",
        "ngCookies",
        "ngAnimate",
        "ngStorage",
        "ui.grid",
        "ui.grid.edit",
        "ui.grid.selection",
        "ui.grid.pagination",
        "ui.grid.exporter",
        "ui.bootstrap",
        "societyApp.home",
        "societyApp.admin",
        "societyApp.member",
        "societyApp.loan",
        "societyApp.person",
        "societyApp.expense",
        "societyApp.settings",
        "societyApp.transaction"
    ])
        .config(function ($routeProvider, $provide) {
            $provide.value('$context', {});
            $provide.value('$serverPath', window.location.origin);

            $routeProvider.when('/member/:action/:id?', {
                'templateUrl': 'javascripts/member/partials/member.html',
                'controller': 'memberRegistrationController'
            }).when('/member', {
                'templateUrl': 'javascripts/member/partials/member-list.html',
                'controller': 'memberListController'
            }).when('/balance', {
                'templateUrl': 'javascripts/member/partials/balance-list.html',
                'controller': 'memberBalanceController'
            }).when('/user/:userId/person/:action/:id?', {
                'templateUrl': 'javascripts/person/partials/personDetails.html',
                'controller': 'personDetailController'
            }).when('/userprofile/:action/:id?', {
                'templateUrl': 'javascripts/admin/partials/user-profile.html',
                'controller': 'userProfileController'
            }).when('/home', {
                'templateUrl': 'javascripts/home/partials/home.html',
                'controller': 'homeController'
            }).when('/login/:action?', {
                'templateUrl': 'javascripts/admin/partials/login.html',
                'controller': 'adminLoginController'
            }).when('/register/:message', {
                'templateUrl': 'javascripts/admin/partials/register-message.html',
                'controller': 'registerController'
            }).when('/reset/password', {
                'templateUrl': 'javascripts/admin/partials/reset-password.html',
                'controller': 'resetPassword'
            }).when('/reset/:message', {
                'templateUrl': 'javascripts/admin/partials/register-message.html',
                'controller': 'registerController'
            }).when('/settings/configure', {
                'templateUrl': 'javascripts/settings/partials/settingsConfig.html',
                'controller': 'settingsConfigController'
            }).when('/settings/manage-user', {
                'templateUrl': 'javascripts/settings/partials/manageUser.html',
                'controller': 'manageUserController'
            }).when('/expense', {
                'templateUrl': 'javascripts/expense/partials/expense-list.html',
                'controller': 'expenseListController'
            }).when('/loan', {
                'templateUrl': 'javascripts/loan/partials/loanSearch.html',
                'controller': 'loanSearchController'
            }).when('/deposit/view', {
                'templateUrl': 'javascripts/transaction/partials/transactionHistory.html',
                'controller': 'transactionHistoryController'
            }).when('/deposit/new', {
                'templateUrl': 'javascripts/transaction/partials/transactionAdd.html',
                'controller': 'transactionAddController'
            }).otherwise({
                'redirectTo': '/login'
            });

        }).controller("appController", ['$rootScope', '$scope', 'AuthenticationService', '$location', '$sessionStorage',
            function ($rootScope, $scope, AuthenticationService, $location, $sessionStorage) {
                $rootScope.$storage = $sessionStorage;
                $scope.heading = 'Application Heading';
                $scope.ngViewPlaceholder = 'NG View Placeholder';
                $scope.footer = 'Footer';
                $scope.navBarConfig = {
                    showNavBar: false
                };
                $scope.loader = {
                    show: false
                };

				$rootScope.$on('global:error', function(event, error){
					$scope.globalMessage.message = error.message;
					$scope.globalMessage.openModal();
				});
                $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl, newState, oldState) {
                    if (!AuthenticationService.isAuthenticated()) {
                        $scope.navBarConfig.showNavBar = false;
                        if (newUrl.indexOf('login/reset') === -1
                            && newUrl.indexOf('login/register') === -1
                            && newUrl.indexOf('register/') === -1
                            && newUrl.indexOf('reset/') === -1) {
                            $location.url('/login');
                        }
                        $scope.loader.show = false;
                    } else {
                        if (newUrl.indexOf('/login') > -1) {
                            $location.url('/home');
                        }
                        $scope.navBarConfig.showNavBar = true;
                    }
                });
            }]);

    angular.bootstrap(document, ["societyApp"]);
});
