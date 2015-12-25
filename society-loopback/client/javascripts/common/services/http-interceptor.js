/**
 * Created by Deepak.Pundir on 12/25/2015.
 */
define([
  'angular'
], function () {
  var MyHttpInterceptor = angular.module("societyApp.common.services.httpinterceptor", ["ngStorage"]);
  MyHttpInterceptor.factory('MyHttpInterceptor', ['$sessionStorage', function ($sessionStorage) {
      return {
        'request': function (config) {
          config.headers['Authorization'] = $sessionStorage.accessToken;
          return config;
        }
      };
    }]);
  MyHttpInterceptor.config(function ($httpProvider) {
      $httpProvider.interceptors.push('MyHttpInterceptor');
    });
  return MyHttpInterceptor;
});