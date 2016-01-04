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
                    }
                };
                filter = angular.merge(filter || {}, defaultMemberListFilter);
                return restInterface.get('/api/Members', null, filter);
            };
            this.getMemberDetail = function getMemberDetail(id, filter){
                var defaultMemberFilter = {
                    "filter": {
                        "include": [{"person":["address"]}]}
                };
                filter = angular.merge(filter || {}, defaultMemberFilter);
                return restInterface.get('/api/Members/'+id, null, filter);
            };
            this.updateMemberDetail = function updateMemberDetail(member, address){
                var defer = $q.defer();
                restInterface.update('api/Addresses/'+address.id,address).then(function(data){
                    restInterface.update('api/People/'+member.id,member).then(function(data){
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
        this.updateMember = function updateMember(member, address){
          var defer = $q.defer();

          member.fname = member.person.fname;
            member.mname = member.person.lname;
          member.lname = member.person.mname;
          member.phone = member.person.phone;
          member.status = member.person.status;

          restInterface.update('/api/Members/personaddress',member).then(function(data){
              defer.resolve(data);
          },function(){
            defer.reject();
          });
          return defer.promise;
        };
        this.addMember = function addMember(person, address){
          var defer = $q.defer();
          person.address = address;
          var member = {
            'fname': person.fname,
            'mname': person.lname,
            'lname': person.mname,
            'phone': person.phone,
            'status': 1,
            'person': person
          };
          restInterface.post('/api/Members/personaddress', member).then(function(data){
            defer.resolve(data);
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