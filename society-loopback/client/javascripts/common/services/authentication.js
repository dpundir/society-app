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
                this.isAuthenticated = function isAuthenticated() {
                    return $cookies.get('access-token') !== undefined;
                };
                this.authenticate = function authenticate(body) {
                    var defer = $q.defer();
                    restInterface.post('/login', body).then(function (data) {
                        var now = new Date();
                        var time = now.getTime();
                        time += (5 * 60 * 1000);
                        now.setTime(time);
                        $cookies.put('access-token', data.accessToken, {
                            expires: now
                        });
                        $cookies.putObject('user', {
                            email: data.email,
                            username: data.username
                        }, {
                            expires: now
                        });
                        defer.resolve(data);
                    }, function (data) {
                        defer.reject(data);
                    });
                    return defer.promise;
                };
                this.logout = function logout() {
                    restInterface.get('/logout').then(function (data) {
                        $cookies.remove('access-token');
                        $cookies.remove('user');
                        $location.url('/login');
                    });
                };
                this.register = function register(body) {
                    restInterface.post('/api/users', body).then(function (data) {
                        $sessionStorage.register = data;
                        $location.url('/register/success');
                    }, function (data) {
                        $cookies.remove('access-token');
                        $cookies.remove('user');
                    });
                };
                this.requestResetPassword = function requestResetPassword(body) {
                    restInterface.post('/request/reset/password', body).then(function (data) {
                        console.log(data);
                        $sessionStorage.register = data;
                        $location.url('/reset/success');
                    }, function (data) {
                        console.log(data);
                        $cookies.remove('access-token');
                        $cookies.remove('user');
                    });
                };
                this.resetPassword = function resetPassword(body) {
                    restInterface.post('/reset/password', body).then(function (data) {
                        console.log(data);
                        $location.url('/login');
                    }, function (data) {
                        console.log(data);
                        $cookies.remove('access-token');
                        $cookies.remove('user');
                    });
                };
            }
        ]);
});