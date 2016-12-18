define([
    'angular',
    'lodash',
    'javascripts/common/services/date-service',
    'javascripts/common/services/rest-interface'
], function (angular, _) {
    angular.module("societyApp.common.directives.print", ["societyApp.common.services.dateService", "societyApp.common.services.restinterface"])
        .directive('printTransaction', ['$uibModal', '$filter', 'dateService', 'restInterface', function ($uibModal, $filter, dateService, restInterface) {
            return{
                restrict: 'EA',
                scope: {
                    options: '=',
                    context: '='
                },
                controller: ['$scope', printController],
                link: function () {
                }
            };
            function printController($scope) {
                function printElement(elem) {
                    var domClone = elem.cloneNode(true);

                    var $printSection = document.getElementById("printSection");

                    if (!$printSection) {
                        var $printSection = document.createElement("div");
                        $printSection.id = "printSection";
                        document.body.appendChild($printSection);
                    }

                    $printSection.innerHTML = "";
                    $printSection.appendChild(domClone);
                    window.print();
                };
                $scope.transaction = {
                    member: {
                        person: {}
                    }
                };
                $scope.context = $scope.context || {};
                $scope.options = $scope.options || {};
                var modalInstance;
                $scope.options.openModal = function () {
                    $scope.options.modalInstance = modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'javascripts/common/partials/print.html',
                        backdrop: 'true',
                        size: 'lg',
                        scope: $scope
                    });
                    $scope.getData();
                };
                $scope.ok = function () {
                    modalInstance.close();
                };
                $scope.print = function () {
                    printElement(document.getElementById("printable-body"));
                };

                $scope.getData = function(){
                    // pass type of the selected configuration
                    var filter = {
                        "filter": {
                            "include": {
                                "member": ["person", "memberDeposit"]
                            }
                        }
                    };
                    return restInterface.get('/api/TransactionHistories/'+$scope.context.transactionId, null, filter).then(function (data) {
                        //data will be sorted in descending order of expire date
                        $scope.transaction = data;
						$scope.transaction.type = $filter('transactionType')(data.type);
                        $scope.transaction.loanId = $scope.transaction.loanId || 'NA';
                        $scope.transaction.member.person.name = data.member.person.firstName
                            + (data.member.person.middleName?" "+data.member.person.middleName:"")
                            + (data.member.person.lastName?" "+data.member.person.lastName:"");
                        $scope.transaction.createDate = $filter('date')($scope.transaction.createDate, dateService.dateConfig().format);
                    });
                }
            }
        }]);
});