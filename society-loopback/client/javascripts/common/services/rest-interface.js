define([
  'angular'
],function(angular) {
  angular.module("societyApp.common.services.restinterface",[])
    .factory('restInterface',['$rootScope', '$http','$q',function ($rootScope, $http, $q) {

      function get(url, data, param, header, config) {
        return call('GET', url, data, param, header, config);
      }

      function post(url, data, param, header, config) {
        return call('POST', url, data, param, header, config);
      }

      function destroy(url, data, param, header, config) {
        return call('DELETE', url, data, param, header, config);
      }

      function update(url, data, param, header, config) {
        return call('PUT', url, data, param, header, config);
      }

      function call(method, url, data, param, header, config) {
        var deferred = $q.defer();
        config = config || {};
        config.transformRequest = config.transformRequest || $http.defaults.transformRequest;
        $http({method: method, url: url, data: data, params: param, withCredentials: true, headers: header, transformRequest: config.transformRequest})
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function (error, status) {
            if (status === 401) {
              $rootScope.$broadcast('session.expired');
            }
            deferred.reject(error);
          });
        return deferred.promise;
      }

      return {
        get: get,
        post: post,
        update: update,
        delete: destroy
      };
    }]);
});