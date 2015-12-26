define([
    'angular',
    'lodash',
    'javascripts/member/services/Member'
], function (angular,_) {
    angular
        .module("societyApp.member.controller.memberlist", ["societyApp.member.services.member"])
        .controller('memberListController',
        ['$scope', 'MemberService','$location',
            function ($scope, MemberService, $location) {
                $scope.people = [];
                $scope.showDetails = function (id) {
                    $location.url('/member/view/'+id);
                };
                MemberService.list().then(function (data) {
                    var join = Array.prototype.join;
                    console.log(data);
                    _.forEach(data,function(people){
                        var peopleList = {},address = people.address;
                        peopleList.fullName = join.call([people.fname,people.mname,people.lname],' ');
                        peopleList.fullAddress = join.call([address.address1,address.address2,
                            address.address3,address.city,address.state,address.pincode],', ');
                        peopleList.id = people.id;
                        peopleList.phone = people.phone;
                        peopleList.img = people.img || 'image/default-emp.jpg';
                        $scope.people.push(peopleList);
                    });
                })
            }]);
});