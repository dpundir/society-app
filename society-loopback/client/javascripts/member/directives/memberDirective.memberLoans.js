/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
  'angular',
  'lodash'
], function (angular, _) {
  angular.module("societyApp.member.directives.memberLoans", ['societyApp.member.filters'])
    .directive('memberLoans',['$location', '$filter', 'MemberService', function ($location, $filter, MemberService) {
      return{
        restrict: 'A',
        scope:{
          memberId:'=',
          memberLoans:'=',
          clickHandler:'&'
        },
        controller: ['$scope',function($scope){

          function initLoanDetails(){
            $scope.defaultSocietyConfigs = MemberService.getTransformedSocietyConfig();
            $scope.loanDetail = {
              id:'',
              amount:'',
              frequency:12,
              createdate:'',
              closedate:'',
              installment:'',
              memberrefid1:'',
              memberrefid2:'',
              memberid:''
            };
          }
          function validateLoanDetails(loanDetail){
            return true;
          }
          $scope.refOption1 = {};
          $scope.refOption2 = {};
          $scope.LOAN_MODE = {
            VIEW: false,
            NEW: false
          };
          $scope.memberLoans = $scope.memberLoans || {};
          $scope.showLoanSection = false;
          $scope.error = {
            errorText:'',
            isError: false
          };
          $scope.openStartdate = function(){
            $scope.date.status.startDateOpened = !$scope.date.status.startDateOpened;
          };
          $scope.openEnddate = function(){
            $scope.date.status.endDateOpened = !$scope.date.status.endDateOpened;
          };
          $scope.date = {
            dateOption: {
              formatYear: 'yy',
              startingDay: 1,
              format: 'dd-MM-yyyy'
            },
            format: 'dd-MM-yyyy',
            status: {
              startDateOpened: false,
              endDateOpened: false
            },
            startDate:new Date(),
            endDate:new Date()
          };
          $scope.memberLoansGrid = {
            enableSorting: false,
            enableFiltering: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect : false,
            modifierKeysToMultiSelect : false,
            noUnselect : true,
            paginationPageSizes: [15, 30, 45],
            paginationPageSize: 15,
            enableColumnMenus: false,
            onRegisterApi: function(gridApi){
              $scope.gridApi = gridApi;
              var self = this;
              gridApi.selection.on.rowSelectionChanged($scope,function(row){
                self.selectedRowId = row.entity.id;
              });
            },
            columnDefs: [
              {field: 'id'},
              {field: 'memberId'},
              {field: 'loanAmount'},
              {field: 'remainingAmount'},
              {field: 'startDate'},
              {field: 'endDate'}
            ],
            data:[],
            selectedRowId:null
          };
          $scope.memberLoans.successCB = function(data){
            var memberLoans = [];
            _.forEach(data,function(loan){
              var memberLoan = {};
              memberLoan.id = loan.id;
              memberLoan.loanAmount = loan.amount;
              memberLoan.memberId = $scope.memberId == loan.memberid? 'SELF': loan.memberid;
              memberLoan.remainingAmount = loan.amount - loan.amountPaid;
              memberLoan.startDate = $filter('date')(loan.createdate,$scope.date.format);
              memberLoan.endDate = $filter('date')(loan.closedate,$scope.date.format);
              memberLoans.push(memberLoan);
            });
            $scope.memberLoansGrid.data = memberLoans;
            $scope.gridApi.core.handleWindowResize();
            $scope.LOAN_MODE.NEW = false;
            $scope.LOAN_MODE.VIEW = false;
            $scope.showLoanSection = false;
            $scope.loanSectionHeading = '';
            initLoanDetails();
          };
          $scope.memberLoans.errorCB = function(){

          };
          $scope.showDetails = function(){
            if(!$scope.memberLoansGrid.selectedRowId){
              $scope.error.isError = true;
              $scope.error.errorText = 'Please select a loan to see details.';
              return;
            }
            MemberService.getLoanDetails($scope.memberId, $scope.memberLoansGrid.selectedRowId).then(function(data){
              _.forOwn($scope.loanDetail, function(value, key){
                $scope.loanDetail[key] = data[key];
              });
              $scope.loanDetail.createdate = new Date($scope.loanDetail.createdate);
              $scope.loanDetail.closedate = new Date($scope.loanDetail.closedate);
              $scope.loanDetail.remainingAmount = data.amount - data.amountPaid;
            }, function(error){
              console.log(error);
            });
            $scope.LOAN_MODE.VIEW = true;
            $scope.LOAN_MODE.NEW = false;
            $scope.showLoanSection = true;
            $scope.loanSectionHeading = 'Loan details';
          };
          $scope.newLoan = function(){
            $scope.LOAN_MODE.NEW = true;
            $scope.LOAN_MODE.VIEW = false;
            $scope.showLoanSection = true;
            $scope.loanSectionHeading = 'New Loan';
            initLoanDetails();
          };
          $scope.calculateInstallment = function(){
            $scope.loanDetail.installment = $scope.loanDetail.amount/$scope.loanDetail.frequency;
            var interest = $scope.defaultSocietyConfigs.shareInterestRate/1200;
          };
          $scope.addNewLoan = function(){
            if(!validateLoanDetails($scope.loanDetail)){
              return;
            }
            var loanDetail = angular.copy($scope.loanDetail);
            loanDetail.memberid = $scope.memberId;
            MemberService.addNewLoan(loanDetail).then(function(data){
              console.log(data);
              $scope.showLoanSection = false;
              initLoanDetails();
            }, function(error){
              console.log(error);
            });
          };
          $scope.openRef1SearchModal = function(){
            $scope.refOption1.openModal();
          };
          $scope.refOption1.onSelectRow = function(memberId){
            $scope.loanDetail.memberrefid1 = memberId;
          };
          $scope.openRef2SearchModal = function(){
            $scope.refOption2.openModal();
          };
          $scope.refOption2.onSelectRow = function(memberId){
            $scope.loanDetail.memberrefid2 = memberId;
          };
          initLoanDetails();
        }],
        templateUrl:'javascripts/member/partials/memberLoan.html',
        link:function(){}
      }
    }])
});
