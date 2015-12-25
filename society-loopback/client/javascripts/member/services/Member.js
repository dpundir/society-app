define([
  'angular'
], function () {
  angular.module("societyApp.member.services.member", [])
    .service('MemberService', ['$http', '$q', 'restInterface', function ($http, $q, restInterface) {
      this.defaultMember = function defaultMember() {
        return {
          fname: '',
          mname: '',
          lname: '',
          phone: '',
          ffname: '',
          flanme: '',
          fmname: '',
          dob: ''
        }
      };
      this.defaultMemberAddress = function defaultMemberAddress() {
        return {
          address1: '',
          address2: '',
          address3: '',
          city: '',
          state: '',
          pin: ''
        }
      };
      this.register = function register() {

      };
      this.list = function (filter) {
        //default filter to include address and deposit history data in member
        //this relation is defined in member.json
        var defaultMemberListFilter = {
          "filter": {
            "include": ["address", "depositHistory"]}
        };
        filter = angular.merge(filter || {}, defaultMemberListFilter);
        return restInterface.get('/api/Members', null, filter);
      }
    }])
});