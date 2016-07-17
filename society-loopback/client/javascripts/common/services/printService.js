define([
    'angular',
    'jquery'
], function (angular, $) {
    angular.module("societyApp.common.services.printService", [])
        .service('printService', function () {
            this.getDefaultPrintConfig = function(){
                var printConfig = {
                    enableGridMenu: true,
                    enableSelectAll: true,
                    exporterCsvFilename: 'myFile.csv',
                    exporterPdfDefaultStyle: {fontSize: 9},
                    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
                    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
                    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
                    exporterPdfFooter: function ( currentPage, pageCount ) {
                        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                    },
                    exporterPdfCustomFormatter: function ( docDefinition ) {
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