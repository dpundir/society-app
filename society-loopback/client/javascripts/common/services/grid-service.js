define([
    'angular',
    'jquery'
], function (angular, $) {
    angular.module("societyApp.common.services.gridService", [])
        .service('gridService', function () {
            this.getDefaultGridConfig = function (columnDefs, printEnabled, options) {
                var gridConfig = {
                    columnDefs: columnDefs,
                    data: [],
                    enableColumnMenus: false,
                    enableFiltering: false,
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    enableSorting: false,
                    modifierKeysToMultiSelect: false,
                    multiSelect: false,
                    noUnselect: true,
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25,
                    selectedRowId: null
                };
                if (printEnabled) {
                    var printConfig = this.getDefaultPrintConfig();
                    gridConfig = $.extend(true, gridConfig, printConfig);
                }
                if (options) {
                    gridConfig = $.extend(true, gridConfig, options);
                }
                return $.extend(true, {}, gridConfig);
            }
            this.getDefaultPrintConfig = function () {
                var printConfig = {
                    enableGridMenu: true,
                    enableHiding: false,
                    enableSelectAll: true,
                    exporterCsvFilename: 'myFile.csv',
                    exporterPdfDefaultStyle: {fontSize: 9},
                    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
                    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
                    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
                    exporterPdfFooter: function (currentPage, pageCount) {
                        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                    },
                    exporterPdfCustomFormatter: function (docDefinition) {
                        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                        return docDefinition;
                    },
                    exporterPdfOrientation: 'portrait',
                    exporterPdfPageSize: 'LETTER',
                    exporterPdfMaxGridWidth: 500,
                    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))
                };
                return $.extend(true, {}, printConfig);
            }
        });
});