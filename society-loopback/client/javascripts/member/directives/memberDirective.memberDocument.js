/**
 * Created by Debashis.Mishra on 3/29/2016.
 */
define([
  'angular',
  'lodash'
], function (angular, _) {
  angular.module("societyApp.member.directives.memberDocument", [])
    .directive('memberDocument',['$filter', '$parse', 'fileUpload', function ($filter, $parse, fileUpload) {
      return{
        restrict: 'A',
        scope:{
          member:'=',
          clickHandler:'&',
          documents: '='
        },
        controller: ['$scope',function($scope, fileUpload){
          $scope.documents = $scope.documents || {};
          $scope.successMsg = "";
          $scope.errorMsg = "";
          $scope.showSuccessMsg = false;
          $scope.showErrorMsg = false;
          $scope.documents.successCB=successCB;
          $scope.documents.errorCB=errorCB;
          $scope.isUploadDocumentCollapsed = true;
          function successCB(data){
            $scope.showSuccessMsg = false;
            $scope.showErrorMsg = false;
            $scope.documents.list = [];
            _.forEach(data, function(document){
              $scope.documents.list.push({
                name: document,
                href: "/file/" + $scope.member.id + "/document/" + document
              })
            });
            console.log(data);
          }
          function errorCB(error){
            console.log(error);
          }
          $scope.documentsList = [];

        }],
        templateUrl:'javascripts/member/partials/memberDocument.html',
        link:function(scope, element, attrs){
          scope.fileQueue = [];
          var allowedFileType = {
            'application/pdf': true,
            'image/jpeg': true,
            'image/png': true
          },maxSize = 1024*1024;
          var fileInput = element.find('input');
          scope.uploadFile = function(file){
            fileUpload.uploadFileToUrl(scope.member.id, scope.files[file.index]).then(function(success){
              _.remove(scope.fileQueue, function(files) {
                return file.index === files.index;
              });
              if(!scope.fileQueue.length){
                fileInput[0].value = '';
              }
              scope.showSuccessMsg = true;
              scope.successMsg = "Fils(s) uploaded successfully.";
              fileUpload.fetchDocumentList(scope.member.id).then(function(data){
                scope.documents.successCB(data);
              },function(error){
                scope.documents.errorCB(error);
              });
            },function(error){
              scope.errorMsg = 'Error in file upload, please try again later.'
            });
          };
          scope.fetchDocument = function(document){
            fileUpload.fetchDocument(scope.member.id, document);
          };
          scope.uploadAllFile = function(){
            var i = 1;
            _.forEach(scope.fileQueue, function(file,index){
              fileUpload.uploadFileToUrl(scope.member.id, scope.files[file.index]).then(function(){
                if(i++ === scope.fileQueue.length) {
                  scope.showSuccessMsg = true;
                  scope.successMsg = "Fils(s) uploaded successfully.";
                  fileInput[0].value = '';
                  fileUpload.fetchDocumentList(scope.member.id).then(function (data) {
                    scope.documents.successCB(data);
                    scope.fileQueue = [];
                  }, function (error) {
                    scope.documents.errorCB(error);
                  });
                }
              },function(error){
                scope.errorMsg = 'Error in file upload, please try again later.'
              });
            })
          };
          scope.deleteFile = function(document){
            fileUpload.deleteDocument(scope.member.id, document).then(function(){
              fileUpload.fetchDocumentList(scope.member.id).then(function(data){
                scope.documents.successCB(data);
              },function(error){
                scope.documents.errorCB(error);
              });
            });
          };
          scope.removeFile = function(index){
            scope.fileQueue.splice(index,1);
            if(!scope.fileQueue.length){
              fileInput[0].value = '';
            }
          };
          fileInput.bind('change', function(){
            scope.files = fileInput[0].files;
            scope.showErrorMsg = false;
            if(scope.files.length >3){
              scope.errorMsg = 'Maximum file allowed for upload is 3.';
              scope.showErrorMsg = true;
              fileInput[0].value = '';
              scope.$digest();
              return;
            }
            _.forEach(scope.files, function(file,index){
              if(!(file.type in allowedFileType)){
                scope.errorMsg = 'Invalid file type, allowed are pdf, image/jpeg, image/png, file name :' + file.name;
                scope.showErrorMsg = true;
                fileInput[0].value = '';
                scope.$digest();
                return;
              }
              if(file.size > maxSize){
                scope.errorMsg = 'Max allowed file size is 1MB. file name :' + file.name;
                scope.showErrorMsg = true;
                fileInput[0].value = '';
                scope.$digest();
                return;
              }
              scope.fileQueue.push({
                name: file.name,
                type: file.type,
                index: index
              });
            });
            scope.$digest();
          });
        }
      }
    }])
});
