/**
 * Created by Deepak.Pundir on 12/25/2015.
 */
define([
    'angular'
], function () {
    var MyHttpInterceptor = angular.module("societyApp.common.services.httpinterceptor", ["ngCookies"]);
    MyHttpInterceptor.factory('MyHttpInterceptor', ['$rootScope', '$cookies', '$location', '$q', function ($rootScope, $cookies, $location, $q) {
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
                } else if(rejection && rejection.status === 422){
                    $rootScope.$broadcast('global:error', rejection.data.error);
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