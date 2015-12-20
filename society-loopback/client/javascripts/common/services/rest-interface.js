define([
  'angular'
],function() {
  angular.module("societyApp.services",[])
    .factory('restInterface',['$http','$q',function ($http, $q) {

      function get(url, data, param, header) {
        return call('GET', url, data, param, header);
      }

      function post(url, data, param, header) {
        return call('POST', url, data, param, header);
      }

      function destroy(url, data, param, header) {
        return call('DELETE', url, data, param, header);
      }

      function update(url, data, param, header) {
        return call('PUT', url, data, param, header);
      }

      function call(method, url, data, param, header) {
        var deferred = $q.defer();
        $http({method: method, url: url, data: data, params: param, withCredentials: true, headers: header})
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