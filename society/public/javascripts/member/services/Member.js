define([
    'angular'
],function() {
    angular.module("societyApp.member")
        .service('MemberService',['$http','$q',function ($http, $q) {
            this.defaultMember = function defaultMember(){
                return {
                    fname: '',
                    mname:'',
                    lname: '',
                    phone: '',
                    ffname: '',
                    flanme: '',
                    fmname: '',
                    dob:''
                }
            };
            this.defaultMemberAddress = function defaultMemberAddress(){
                return {
                    address1: '',
                    address2: '',
                    address3: '',
                    city: '',
                    state: '',
                    pin: ''
                }
            };
            this.register = function register(){

            };
        }])
});