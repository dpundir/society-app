define([
    'angular'
], function () {
    angular.module("societyApp.member.services.member", [])
        .service('MemberService', ['$http', '$q', 'restInterface', function ($http, $q, restInterface) {
            this.defaultMember = function defaultMember(member) {
                member = member || {};
                return {
                    fname: member.fname || '',
                    mname: member.mname || '',
                    lname: member.lname || '',
                    phone: member.phone || '',
                    ffname: member.ffname || '',
                    flname: member.flname || '',
                    fmname: member.fmname || '',
                    dob: member.dob || '',
                    sex: member.sex || '',
                    id: member.id || '',
                    addressid: member.addressid || null,
                    depositId: member.depositId || null,
                    marital_status: member.marital_status || ''
                }
            };
            this.defaultMemberAddress = function defaultMemberAddress() {
                return {
                    address1: '',
                    address2: '',
                    address3: '',
                    city: '',
                    state: '',
                    pincode: '',
                    id:''
                }
            };
            this.register = function register() {

            };
            this.list = function list(filter) {
                //default filter to include address and deposit history data in member
                //this relation is defined in member.json
                var defaultMemberListFilter = {
                    "filter": {
                        "include": ["address"]}
                };
                filter = angular.merge(filter || {}, defaultMemberListFilter);
                return restInterface.get('/api/Members', null, filter);
            };
            this.getMemberDetail = function getMemberDetail(id, filter){
                var defaultMemberFilter = {
                    "filter": {
                        "include": ["address", "memberDeposit"]}
                };
                filter = angular.merge(filter || {}, defaultMemberFilter);
                return restInterface.get('/api/Members/'+id, null, filter);
            };
            this.updateMemberDetail = function updateMemberDetail(member, address){
                var defer = $q.defer();
                restInterface.update('api/Addresses/'+address.id,address).then(function(data){
                    restInterface.update('api/Members/'+member.id,member).then(function(data){
                        defer.resolve(data);
                    },function(){
                        defer.reject();
                    });
                },function(){
                    defer.reject();
                });
                return defer.promise;
            };
            this.addNewMemberDetail = function addNewMemberDetail(member, address){
                var defer = $q.defer();
                restInterface.post('api/Addresses',address).then(function(data){
                    member.addressid = data.id;
                    if(member.depositId){
                        delete member.depositId;
                    }
                    restInterface.post('api/Members',member).then(function(data){
                        defer.resolve(data);
                    },function(){
                        defer.reject();
                    });
                },function(){
                    defer.reject();
                });
                return defer.promise;
            };
            this.addNewTransaction = function(transaction){
                return restInterface.post('api/Members/transaction',transaction);
            };
            this.getTransactionHistory = function(memberId, startDate, endDate){
                var createDate;
                var TWO_MONTH = 60 * 24 * 60 * 60 * 1000;
                if(startDate && endDate){
                    startDate = new Date(startDate).getTime();
                    endDate = new Date(endDate).getTime();
                    createDate = {between:[startDate, endDate]}
                }else{
                    createDate = {gt: new Date().getTime()-TWO_MONTH}
                }
                var filter = {
                    "filter": {
                        "where": {
                            "memberId": memberId,
                            "createDate":createDate
                        }
                    }
                };
                return restInterface.get('api/TransactionHistories',null,filter);
            }
        }])
});