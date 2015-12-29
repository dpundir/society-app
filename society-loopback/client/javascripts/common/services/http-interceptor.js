/**
 * Created by Deepak.Pundir on 12/25/2015.
 */
define([
  'angular'
], function () {
  var MyHttpInterceptor = angular.module("societyApp.common.services.httpinterceptor", ["ngCookies"]);
  MyHttpInterceptor.factory('MyHttpInterceptor', ['$cookies', function ($cookies) {
      return {
        'request': function (config) {
          config.headers['Authorization'] = $cookies.get('access-token');
          return config;
        }
      };
    }]);
  MyHttpInterceptor.config(function ($httpProvider) {
      $httpProvider.interceptors.push('MyHttpInterceptor');
    });
  return MyHttpInterceptor;
});