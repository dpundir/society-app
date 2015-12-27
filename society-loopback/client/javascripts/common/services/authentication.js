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
                    var defer = $q.defer();
                    restInterface.post('/login', body).then(function (data) {
                        $cookies.put('access-token',data.accessToken);
                        $sessionStorage.accessToken = data.accessToken;
                        defer.resolve(data);
                    }, function (data) {
                        delete $sessionStorage.accessToken;
                        defer.reject(data);
                    });
                    return defer.promise;
                };
                this.logout = function logout() {
                    restInterface.get('/logout').then(function (data) {
                        delete $sessionStorage.accessToken;
                        $cookies.remove('access-token');
                        $location.url('/login');
                    });
                };
                this.register = function register(body) {
                    restInterface.post('/api/users', body).then(function (data) {
                        $sessionStorage.register = data;
                        $location.url('/register/success');
                    }, function (data) {
                        $cookies.remove('access-token');
                        delete $sessionStorage.accessToken;
                    });
                };
            }
        ]);
});