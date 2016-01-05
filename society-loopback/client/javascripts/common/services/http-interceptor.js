/**
 * Created by Deepak.Pundir on 12/25/2015.
 */
define([
    'angular'
], function () {
    var MyHttpInterceptor = angular.module("societyApp.common.services.httpinterceptor", ["ngCookies"]);
    MyHttpInterceptor.factory('MyHttpInterceptor', ['$cookies', '$location', '$q', function ($cookies, $location, $q) {
        return {
            'request': function (config) {
                config.headers['Authorization'] = $cookies.get('access-token');
                return config;
            },
            'responseError': function (rejection) {
                // do something on error
                console.log(rejection);
                if (rejection && rejection.status === 401) {
                    $cookies.remove('access-token');
                    $cookies.remove('user');
                    $location.url('/login');
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }
        };
    }]);
    MyHttpInterceptor.config(function ($httpProvider) {
        $httpProvider.interceptors.push('MyHttpInterceptor');
    });
    return MyHttpInterceptor;
});