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
});