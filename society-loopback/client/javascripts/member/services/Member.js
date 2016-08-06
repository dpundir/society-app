define([
    'angular'
], function () {
    angular.module("societyApp.member.services.member", ['ngStorage'])
        .service('MemberService', ['$http', '$q', 'restInterface', '$localStorage', function ($http, $q, restInterface, $localStorage) {
            this.getSocietyConfig = function () {
                return $localStorage.memberConfig;
            };
            this.setSocietyConfig = function (config) {
                $localStorage.memberConfig = config || {};
            };
            this.getTransformedSocietyConfig = function () {
                if (Object.keys($localStorage.memberConfig).length > 0) {
                    return _.transform($localStorage.memberConfig, function (result, value) {
                        result[value.name] = value.value;
                    }, {});
                } else {
                    return {};
                }
            };
            this.defaultMember = function defaultMember(member) {
                member = member || {};
                member.person = member.person || {};
                member.nominee = member.nominee || {};
                return {
                    fname: member.fname || '',
                    mname: member.mname || '',
                    lname: member.lname || '',
                    phone: member.phone || '',
                    status: member.status || 0,
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
            this.listWithSearchString = function listWithSearchString(searchString) {
                var memberListFilter = {
                    "filter": {
                        "where": {
                            "or": [
                                {"fname": {"regexp": searchString}},
                                {"lname": {"regexp": searchString}},
                                {"mname": {"regexp": searchString}}
                            ]}
                    }
                };
                if (!searchString) {
                    memberListFilter = {};
                }
                var filter = angular.merge(filter || {}, memberListFilter);
                return restInterface.get('/api/Members', null, filter);
            };
            this.getMemberDetail = function getMemberDetail(id, filter) {
                var defaultMemberFilter = {
                    "filter": {
                        "include": [
                            {"person": ["address"]},
                            {"nominee": ["address"]}
                        ]}
                };
                filter = angular.merge(filter || {}, defaultMemberFilter);
                return restInterface.get('/api/Members/' + id, null, filter);
            };
            this.getMemberNomineeDetail = function getMemberNomineeDetail(id, filter) {
                var defaultMemberFilter = {
                    "filter": {
                        "include": [
                            {"nominee": ["address"]}
                        ]}
                };
                filter = angular.merge(filter || {}, defaultMemberFilter);
                return restInterface.get('/api/Members/' + id, null, filter);
            };
            this.updateMember = function updateMember(member, entity) {
                var defer = $q.defer();
                var memberRequest = {
                    id: member.id
                };
                if (entity === 'person') {
                    memberRequest.fname = member.person.fname;
                    memberRequest.mname = member.person.lname;
                    memberRequest.lname = member.person.mname;
                    memberRequest.phone = member.person.phone;
                    memberRequest.status = member.person.status;
                }
                memberRequest[entity] = member[entity];

                restInterface.update('/api/Members/' + entity, memberRequest).then(function (data) {
                    defer.resolve(data);
                }, function () {
                    defer.reject();
                });
                return defer.promise;
            };
            this.addMember = function addMember(member, entity) {
                var defer = $q.defer();
                var memberRequest = {
                    status: 1
                };
                if (entity === 'person') {
                    memberRequest.fname = member.person.fname;
                    memberRequest.mname = member.person.lname;
                    memberRequest.lname = member.person.mname;
                    memberRequest.phone = member.person.phone;
                } else {
                    memberRequest.id = member.id;
                }
                memberRequest[entity] = member[entity];
                memberRequest[entity].status = 1;

                restInterface.post('/api/Members/' + entity, memberRequest).then(function (data) {
                    defer.resolve(data);
                }, function () {
                    defer.reject();
                });

                return defer.promise;
            };
            this.getMemberDeposit = function (id) {
                return restInterface.get('api/MemberDeposits/' + id);
            };
            this.updateMemberDeposit = function (id, data) {
                return restInterface.update('api/MemberDeposits/' + id, data);
            };
            this.updateMemberDepositId = function (id, memberId) {
                return restInterface.update('api/Members/' + memberId, {depositId: id});
            };
            this.createMemberDeposit = function (data) {
                return restInterface.post('api/MemberDeposits', data);
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
            };
            this.getLoanDetails = function (memberId, loanId) {
                var filter = {};
                if (memberId) {
                    filter = {
                        "filter": {
                            "where": {"memberid": memberId}
                        }
                    }
                };
                return restInterface.get('/api/Loans/' + loanId, null, filter);
            };
            this.getMemberLoans = function (memberId, isLoanAvailedOrRefferedOrBoth, startDate, endDate) {
                var loanAvailFilter = {
                    "filter": {
                        "where": {"memberid": memberId}
                    }
                };
                var loanReferredFilter = {
                    "filter": {
                        "where": {
                            "or": [
                                {"memberrefid1": memberId},
                                {"memberrefid2": memberId}
                            ]}
                    }
                };
                var loanAvailedOrReferredFilter = {
                    "filter": {
                        "where": {
                            "or": [
                                {"memberid": memberId},
                                {"memberrefid1": memberId},
                                {"memberrefid2": memberId}
                            ]}
                    }
                };
                var filter;
                if (isLoanAvailedOrRefferedOrBoth == 1) {
                    filter = loanAvailFilter;
                } else if (isLoanAvailedOrRefferedOrBoth == 2) {
                    filter = loanReferredFilter;
                } else if (isLoanAvailedOrRefferedOrBoth == 3) {
                    filter = loanAvailedOrReferredFilter;
                }
                return restInterface.get('/api/Loans', null, filter);
            };
            this.getAllMemberLoans = function () {
                return restInterface.get('/api/Loans');
            };

            this.addNewLoan = function (loanDetail) {
                return restInterface.post('/api/Loans', loanDetail);
            };
        }])
        .service('fileUpload', ['$http', 'restInterface', function ($http, restInterface) {
            this.uploadFileToUrl = function (memberId, file) {
                var uploadUrl = "/file/" + memberId + "/document";
                var fd = new FormData();
                fd.append('file', file);
                return restInterface.post(uploadUrl, fd, undefined, {
                    'Content-Type': undefined
                }, {
                    transformRequest: angular.identity
                });
            };
            this.fetchDocumentList = function (memberId) {
                return restInterface.get("/file/" + memberId + "/document");
            };
            this.deleteDocument = function (memberId, documentId) {
                return restInterface.delete("/file/" + memberId + "/document/" + documentId);
            };
            this.fetchDocument = function (memberId, documentId) {
                //restInterface.get("/api/Documents/" + memberId + "/fetch/" + documentId, null, null, {'Accept': 'image/jpeg, image/png, image/jpg, application/pdf'}).then(function (data) {
                restInterface.get("/file/" + memberId + "/document/" + documentId, null, null, {'Accept': 'image/png, image/jpeg, application/pdf'}).then(function (data) {
                    //console.log(data);
                }, function (error) {
                    console.log(error);
                });
            };

            this.deleteProfilePhoto = function (personId, photoName) {
                return restInterface.delete("/file/" + personId + "/profile/" + photoName);
            };

            this.addEditProfilePhoto = function (personId, file, isAddProfilePhoto) {
                var uploadUrl = "/file/" + personId + "/profile";
                var fd = new FormData();
                fd.append('file', file);
                return restInterface.post(uploadUrl, fd, undefined, {
                    'Content-Type': undefined
                }, {
                    transformRequest: angular.identity
                });
            };
        }])
        .service('SelectOptions', function () {
            this.getRelations = function () {
                return [
                    {id: 0, label: 'Father'},
                    {id: 1, label: 'Mother'},
                    {id: 2, label: 'Husband'},
                    {id: 3, label: 'Wife'},
                    {id: 4, label: 'Children'},
                    {id: 5, label: 'Brother'},
                    {id: 6, label: 'Sister'}
                ];
            };
            this.getDepositFrequencyOptions = function(){
                return [
                    {id: 1, label: 'Monthly'},
                    {id: 3, label: 'Quaterly'},
                    {id: 6, label: 'Half-Yearly'},
                    {id: 12, label: 'Yearly'}
                ];
            }
        });
});
