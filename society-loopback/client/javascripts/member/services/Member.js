define([
    'angular'
], function () {
    angular.module("societyApp.member.services.member", [])
        .service('MemberService', ['$http', '$q', 'restInterface', function ($http, $q, restInterface) {
            this.defaultMember = function defaultMember(member) {
                member = member || {};
                member.person = member.person || {};
                member.nominee = member.nominee || {};
                return {
                    fname: member.fname || '',
                    mname: member.mname || '',
                    lname: member.lname || '',
                    phone: member.phone || '',
                    createDate: member.createDate || '',
                    modifiedDate: member.modifiedDate || '',
                    id: member.id || '',
                    person: member.person,
                    nominee: member.nominee,
                    personId: member.personId || '',
                    nomineeId: member.nomineeId || '',
                    depositId: member.depositId || null
                }
            };
            this.defaultMemberAddress = function defaultMemberAddress(address) {
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
            this.list = function list(filter) {
                //default filter to include address and deposit history data in member
                //this relation is defined in member.json
                var defaultMemberListFilter = {
                    "filter": {
                    }
                };
                filter = angular.merge(filter || {}, defaultMemberListFilter);
                return restInterface.get('/api/Members', null, filter);
            };
            this.getMemberDetail = function getMemberDetail(id, filter) {
                var defaultMemberFilter = {
                    "filter": {
                        "include": [
                            {"person": ["address"]}
                        ]}
                };
                filter = angular.merge(filter || {}, defaultMemberFilter);
                return restInterface.get('/api/Members/' + id, null, filter);
            };
            this.updateMember = function updateMember(member, address) {
                var defer = $q.defer();

                member.fname = member.person.fname;
                member.mname = member.person.mname;
                member.lname = member.person.lname;
                member.phone = member.person.phone;
                member.status = member.person.status;
                if(!member.nomineeId){
                    delete member.nomineeId;
                    delete member.nominee;
                }

                restInterface.update('/api/Members/personaddress', member).then(function (data) {
                    defer.resolve(data);
                }, function () {
                    defer.reject();
                });
                return defer.promise;
            };
            this.addMember = function addMember(member) {
                var defer = $q.defer();
                var member = {
                    'fname': member.person.fname,
                    'mname': member.person.lname,
                    'lname': member.person.mname,
                    'phone': member.person.phone,
                    'status': 1,
                    'person': member.person
                };
                restInterface.post('/api/Members/personaddress', member).then(function (data) {
                    defer.resolve(data);
                }, function () {
                    defer.reject();
                });
                return defer.promise;
            };
            this.getMemberDeposit = function(id){
                return restInterface.get('api/MemberDeposits/' + id);
            };
            this.addNewTransaction = function (transaction) {
                return restInterface.post('api/Members/transaction', transaction);
            };
            this.getTransactionHistory = function (memberId, startDate, endDate) {
                var createDate;
                var TWO_MONTH = 60 * 24 * 60 * 60 * 1000;
                if (startDate && endDate) {
                    startDate = new Date(startDate).getTime();
                    endDate = new Date(endDate).getTime();
                    createDate = {between: [startDate, endDate]}
                } else {
                    createDate = {gt: new Date().getTime() - TWO_MONTH}
                }
                var filter = {
                    "filter": {
                        "where": {
                            "memberId": memberId,
                            "createDate": createDate
                        }
                    }
                };
                return restInterface.get('api/TransactionHistories', null, filter);
            }
        }])
        .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (memberId, file, uploadUrl) {
                var fd = new FormData();
                fd.append('memberId', memberId);
                fd.append('file', file);

                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (data) {
                        console.log(data);
                })
                .error(function (error) {
                        console.log(error);
                });
            }
        }]);
});