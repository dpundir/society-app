define([
    'angular'
], function () {
    angular.module("societyApp.member.services.member", ['ngStorage'])
        .service('MemberService', ['$http', '$q', 'restInterface', '$sessionStorage', '$filter', function ($http, $q, restInterface, $sessionStorage, $filter) {
            this.getSocietyConfig = function () {
                return $sessionStorage.memberConfig;
            };
            this.setSocietyConfig = function (config) {
                $sessionStorage.memberConfig = config || [];
                _.forEach(config, function (value, key) {
                    $sessionStorage[value.name] = value;
                });
            };
            this.getTransformedSocietyConfig = function () {
                if (Object.keys($sessionStorage.memberConfig).length > 0) {
                    return _.transform($sessionStorage.memberConfig, function (result, value) {
                        result[value.name] = value.value;
                    }, {});
                } else {
                    return {};
                }
            };
            this.defaultMember = function defaultMember(member) {
                member = member || {};
                member.person = member.person || {guardianType: 1};
                member.memberNominee = (member.memberNominee && member.memberNominee.length > 0) ? member.memberNominee : [
                    {relation: 0, nominee: {guardianType: 1}}
                ];
                return {
                    status: member.status || 0,
                    createDate: member.createDate || '',
                    modifiedDate: member.modifiedDate || '',
                    id: member.id || '',
                    person: member.person,
                    memberNominee: member.memberNominee,
                    personId: member.personId || '',
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
                        "include": ["person"]
                    }
                };
                filter = angular.merge(defaultMemberListFilter, filter || {});
                return restInterface.get('/api/Members', null, filter);
            };
            this.listWithSearchString = function listWithSearchString(searchString) {
                var memberListFilter = {
                    "filter": {
                        "fields": ['id', 'firstName', 'lastName', 'middleName'],
                        "where": searchString ? {
                            "or": [
                                {"firstName": {"regexp": searchString}},
                                {"lastName": {"regexp": searchString}},
                                {"middleName": {"regexp": searchString}}
                            ]} : {},
                        "include": {
                            relation: 'member'
                        }
                    }
                };
                return restInterface.get('/api/People', null, memberListFilter);
            };
            this.getMemberDetail = function getMemberDetail(id, filter) {
                var defaultMemberFilter = {
                    "filter": {
                        "include": [
                            {"person": ["address"]},
                            {"memberNominee": [
                                {"nominee": ["address", "member"]}
                            ]}
                        ]}
                };
                filter = angular.merge(defaultMemberFilter, filter || {});
                return restInterface.get('/api/Members/' + id, null, filter);
            };
            this.isPersonExistingMember = function isPersonExistingMember(personId) {
                var defaultMemberFilter = {
                    "where": {
                        "nomineeId": personId
                    }
                };
                return restInterface.get('/api/Members/count', null, defaultMemberFilter);
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
                var memberRequest = {
                    id: member.id
                };
                if (entity === 'person') {
                    memberRequest.status = member.person.status;
                }
                if (entity == 'person') {
                    memberRequest[entity] = member[entity];
                } else {
                    memberRequest['memberNominee'] = member['memberNominee'];
                    delete memberRequest['memberNominee'][0].nominee.member;
                }
                return restInterface.update('/api/Members/' + entity, memberRequest);
            };
            this.addUserAsMember = function (entity) {
                return restInterface.post('api/Members', entity);
            };
            this.updateUser = function (data, id) {
                return restInterface.update('api/users/' + id, data);
            };
            this.addMember = function addMember(member, entity) {
                var memberRequest = {
                    id: member.id,
                    status: 1
                };
                if (entity == 'person') {
                    memberRequest[entity] = member[entity];
                    memberRequest[entity].status = 1;
                } else {
                    member['memberNominee'][0].memberId = member.id;
                    member['memberNominee'][0].nomineeId = member['memberNominee'][0][entity].id;
                    member['memberNominee'][0].nominee.status = 1;
                    memberRequest['memberNominee'] = member['memberNominee'];
                    delete memberRequest['memberNominee'][0].nominee.member;
                }
                return restInterface.post('/api/Members/' + entity, memberRequest);
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
                            "where": {"memberId": memberId}
                        }
                    }
                }
                return restInterface.get('/api/Loans/' + loanId, null, filter);
            };
			this.getMemberIdentities = function (personId) {
				var filter = {};
				if (personId) {
					filter = {
						"filter": {
							"where": {"personId": personId}
						}
					}
				}
				return restInterface.get('/api/PersonIdentities', null, filter);
			};
            this.getMemberLoans = function (memberId, isLoanAvailedOrRefferedOrBoth, startDate, endDate, isRunning) {
                var loanAvailFilter, loanReferredFilter, loanAvailedOrReferredFilter, filter;
                if (isLoanAvailedOrRefferedOrBoth == 1) {
                    if (isRunning) {
                        loanAvailFilter = {
                            "filter": {
                                "where": {
                                    "memberId": memberId,
                                    createDate: {
                                        lte: $filter('date')(new Date(), 'yyyy-MM-dd')
                                    },
                                    closeDate: {
                                        gte: $filter('date')(new Date(), 'yyyy-MM-dd')
                                    }
                                }
                            }
                        };
                    } else {
                        loanAvailFilter = {
                            "filter": {
                                "where": {"memberId": memberId}
                            }
                        };
                    }
                    filter = loanAvailFilter;
                } else if (isLoanAvailedOrRefferedOrBoth == 2) {
                    if (isRunning) {
                        loanReferredFilter = {
                            "filter": {
                                "where": {
                                    "and": [
                                        {
                                            "or": [
                                                {"memberRefid1": memberId},
                                                {"memberRefid2": memberId}
                                            ]
                                        }, {
                                            "and": [
                                                {createDate: {lte: $filter('date')(new Date(), 'yyyy-MM-dd')}},
                                                {closeDate: {gte: $filter('date')(new Date(), 'yyyy-MM-dd')}}
                                            ]
                                        }
                                    ]
                                }
                            }
                        }

                    } else {
                        loanReferredFilter = {
                            "filter": {
                                "where": {
                                    "or": [
                                        {"memberRefid1": memberId},
                                        {"memberRefid2": memberId}
                                    ]
                                }
                            }
                        }
                    }
                    filter = loanReferredFilter;
                } else if (isLoanAvailedOrRefferedOrBoth == 3) {
                    if (isRunning) {
                        loanAvailedOrReferredFilter = {
                            "filter": {
                                "where": {
                                    "and": {
                                        "or": [
                                            {"memberId": memberId},
                                            {"memberRefid1": memberId},
                                            {"memberRefid2": memberId}
                                        ],
                                        and: [
                                            {
                                                createDate: {lte: $filter('date')(new Date(), 'yyyy-MM-dd')}
                                            }, {
                                                closeDate: {gte: $filter('date')(new Date(), 'yyyy-MM-dd')}
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    } else {
                        loanAvailedOrReferredFilter = {
                            "filter": {
                                "where": {
                                    "or": [
                                        {"memberId": memberId},
                                        {"memberRefid1": memberId},
                                        {"memberRefid2": memberId}
                                    ]
                                }
                            }
                        };
                    }
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

			this.addNewIdentity = function (identityDetail) {
				return restInterface.post('/api/PersonIdentities', identityDetail);
			};

			this.deleteIdentity = function (id) {
				return restInterface.delete('/api/PersonIdentities/' + id);
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
				if(isAddProfilePhoto){
					return restInterface.post(uploadUrl, fd, undefined, {
						'Content-Type': undefined
					}, {
						transformRequest: angular.identity
					});
				} else{
					return restInterface.update(uploadUrl, fd, undefined, {
						'Content-Type': undefined
					}, {
						transformRequest: angular.identity
					});
				}
            };
        }])
        .value('SelectOptions', {
            getRelations : function () {
                return [
                    {id: 0, label: 'Father'},
                    {id: 1, label: 'Mother'},
                    {id: 2, label: 'Husband'},
                    {id: 3, label: 'Wife'},
                    {id: 4, label: 'Children'},
                    {id: 5, label: 'Brother'},
                    {id: 6, label: 'Sister'}
                ];
            },
            getDepositFrequencyOptions : function () {
                return [
                    {id: 12, label: 'Monthly'},
                    {id: 4, label: 'Quarterly'},
                    {id: 2, label: 'Half-Yearly'},
                    {id: 1, label: 'Yearly'}
                ];
            },
			getDepositOptions : function () {
				return [
					{id: 1, label: 'CD'},
					{id: 2, label: 'Loan'},
					{id: 3, label: 'Share'},
					{id: 4, label: 'Kalyan'},
					{id: 5, label: 'Building'}
				];
			},
            getPersonStatusOptions : function () {
                return [
                    {id: 0, label: 'Inactive'},
                    {id: 1, label: 'Active'},
                    {id: 2, label: 'Dormant'},
                    {id: 3, label: 'Expired'}
                ];
            },
            getMaritalStatusOptions : function () {
                return [
                    {id: 0, label: 'Unmarried'},
                    {id: 1, label: 'Married'},
                    {id: 2, label: 'Divorcee'},
                    {id: 3, label: 'Widowed'}
                ];
            },
            getGenderOptions : function () {
                return [
                    {id: 0, label: 'Male'},
                    {id: 1, label: 'Female'}
                ];
            },
			getIdentityOptions : function () {
				return [
					{id: 1, label: 'Aadhar'},
					{id: 2, label: 'PAN'},
					{id: 3, label: 'Driving License'},
					{id: 4, label: 'Voter ID'},
					{id: 5, label: 'Passport'}
				];
			}
        });
});
