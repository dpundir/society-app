define([
  'angular'
], function () {
  angular.module("societyApp.admin.services.userprofile", [])
    .service('UserProfileService', ['$http', '$q', 'restInterface', function ($http, $q, restInterface) {
      this.defaultPerson = function defaultPerson(person) {
        person = person || {};
        person.address = person.address || {};
        return {
          id: person.id || '',
          fname: person.fname || '',
          mname: person.mname || '',
          lname: person.lname || '',
          ffname: person.ffname || '',
          fmname: person.fmname || '',
          flname: person.flname || '',
          phone: person.phone || '',
          status: person.status || '',
          dob: person.dob || null,
          createDate: person.createDate || '',
          modifiedDate: person.modifiedDate || '',
          address: person.address,
          addressid: person.addressid,
          sex: person.sex,
          marital_status: person.marital_status,
          relation: person.relation
        }
      };
      this.defaultAddress = function defaultAddress() {
        return {
          address1: '',
          address2: '',
          address3: '',
          city: '',
          state: '',
          pincode: '',
          id: ''
        }
      };

      this.getPerson = function getPerson(id, filter) {
        var defaultPersonFilter = {
          "filter": {
            "include": ["address"]
          }
        };
        filter = angular.merge(filter || {}, defaultPersonFilter);
        return restInterface.get('/api/People/' + id, null, filter);
      };

      this.updatePerson = function updatePerson(person) {
        var defer = $q.defer();
        restInterface.update('/api/People/personaddress', person).then(function (data) {
          defer.resolve(data);
        }, function () {
          defer.reject();
        });
        return defer.promise;
      };

      this.addPerson = function addPerson(person) {
        var defer = $q.defer();
        restInterface.post('/api/People/personaddress', person).then(function (data) {
          defer.resolve(data);
        }, function () {
          defer.reject();
        });
        return defer.promise;
      };
    }])
      .service('SelectOptions', function () {
          this.getUserStatusOptions = function(){
              return [
                  {id: '0', label: 'Inactive'},
                  {id: '1', label: 'Active'},
                  {id: '2', label: 'Dormant'},
                  {id: '3', label: 'Expired'}
              ];
          };
          this.getUserRoleOptions = function(){
              return [
                  {id: 1, label: 'Admin'},
                  {id: 2, label: 'Employee'},
                  {id: 3, label: 'Member'}
              ];
          };
      })
      .filter('mapUserStatus', function() {
          var statusHash = {
              0: 'Inactive',
              1: 'Active',
              2: 'Dormant',
              3: 'Expired'
          };

          return function(input) {
              if (!input){
                  return '';
              } else {
                  return statusHash[input];
              }
          };
      })
      .filter('mapUserRole', function() {
        var roleHash = {
            1: 'Admin',
            2: 'Employee',
            3: 'Member'
        };

        return function(input) {
            if (!input){
                return '';
            } else {
                return roleHash[input];
            }
        };
    });
});