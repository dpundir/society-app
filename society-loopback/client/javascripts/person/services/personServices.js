define([
    'angular'
], function () {
    angular.module("societyApp.person.services.detail", [])
        .service('PersonService', ['$http', '$q', 'restInterface', function ($http, $q, restInterface) {
            this.defaultPerson = function defaultPerson(person) {
                person = person || {};
                return {
                    fname: person.fname || '',
                    mname: person.mname || '',
                    lname: person.lname || '',
                    phone: person.phone || '',
                    status: person.status || '',
                    addressid: person.addressid || '',
                    dob: person.dob || '',
                    ffname: person.ffname || '',
                    fmname: person.fmname || '',
                    flname: person.flname || '',
                    sex: person.sex || '',
                    maritalStatus: person.maritalStatus || '',
                    createDate: person.createDate || '',
                    modifiedDate: person.modifiedDate || '',
                    id: person.id || ''
                }
            };
            this.defaultPersonAddress = function defaultPersonAddress(address) {
                address = address || {};
                return {
                    address1: address.address1 || '',
                    address2: address.address2 || '',
                    address3: address.address3 || '',
                    city: address.city || '',
                    state: address.state || '',
                    pincode: address.pincode || '',
                    id: address.id || ''
                }
            };
            this.register = function register() {

            };
            this.getPersonDetail = function getPersonDetail(id, filter) {
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
        }]);
});
