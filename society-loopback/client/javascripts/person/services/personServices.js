define([
    'angular'
], function () {
    angular.module("societyApp.person.services.detail", [])
        .service('PersonService', ['$http', '$q', 'restInterface', function ($http, $q, restInterface) {
            this.defaultPerson = function defaultPerson(person) {
                person = person || {};
                return {
					firstName: person.firstName || '',
					middleName: person.middleName || '',
					lastName: person.lastName || '',
                    phone: person.phone || '',
                    status: person.status || 0,
                    addressId: person.addressId || -1,
                    dob: person.dob || '',
					fatherFirstName: person.fatherFirstName || '',
					fatherMiddleName: person.fatherMiddleName || '',
					fatherLastName: person.fatherLastName || '',
					motherFirstName: person.motherFirstName || '',
					motherMiddleName: person.motherMiddleName || '',
					motherLastName: person.motherLastName || '',
                    guardianType:  person.guardianType || 1,
                    sex: person.sex || 0,
                    maritalStatus: person.maritalStatus || 0,
                    createDate: person.createDate || '',
                    modifiedDate: person.modifiedDate || '',
                    id: person.id || '',
                    address: person.address || {},
                    profilePhotoName: person.profilePhotoName || ''
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
