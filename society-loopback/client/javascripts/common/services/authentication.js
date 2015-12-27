/**
 * Created by Deepak.Pundir on 12/25/2015.
 */
define([
  'angular',
  'ngStorage'
], function () {
  angular.module("societyApp.common.services.authentication", ['ngCookies', 'ngStorage'])
    .service('AuthenticationService', ['$http', '$q', '$cookies', '$location', 'restInterface', '$sessionStorage',
      function ($http, $q, $cookies, $location, restInterface, $sessionStorage) {
        delete $sessionStorage.accessToken;
        this.isAuthenticated = function isAuthenticated() {
          return $cookies.get('access-token') !== undefined;
        };
        this.authenticate = function authenticate(body) {
          restInterface.post('/login', body).then(function (data) {
            console.log(data);
            $sessionStorage.accessToken = data.accessToken;
            $location.url('/home');
          }, function (data) {
            console.log(data);
            delete $sessionStorage.accessToken;
          });
        };
        this.logout = function logout() {
          restInterface.get('/logout').then(function (data) {
            delete $sessionStorage.accessToken;
            $location.url('/login');
          });
        };
        this.register = function register(body) {
          restInterface.post('/api/users', body).then(function (data) {
            console.log(data);
            $sessionStorage.register = data;
            $location.url('/register/success');
          }, function (data) {
            console.log(data);
            delete $sessionStorage.accessToken;
          });
        };
        this.requestResetPassword = function requestResetPassword(body) {
          restInterface.post('/request/reset/password', body).then(function (data) {
            console.log(data);
            $sessionStorage.register = data;
            $location.url('/reset/success');
          }, function (data) {
            console.log(data);
            delete $sessionStorage.accessToken;
          });
        };
        this.resetPassword = function resetPassword(body) {
          restInterface.post('/reset/password', body).then(function (data) {
            console.log(data);
            $location.url('/login');
          }, function (data) {
            console.log(data);
            delete $sessionStorage.accessToken;
          });
        };
      }
    ]);
});