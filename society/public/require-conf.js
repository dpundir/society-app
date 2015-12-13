'use strict';
requirejs.config({
    baseUrl: '.',

    paths: {
        'angular': 'node_modules/angular/angular',
        'angular-animate': 'node_modules/angular-animate/angular-animate',
        'angular-aria': 'node_modules/angular-aria/angular-aria',
        'angular-lodash': 'node_modules/angular-lodash/angular-lodash',
        'angular-resource': 'node_modules/angular-resource/angular-resource',
        'angular-route': 'node_modules/angular-route/angular-route',
        'angular-cookies': 'node_modules/angular-cookies/angular-cookies',
        'angular-sanitize': 'node_modules/angular-sanitize/angular-sanitize',
        'angular-scenario': 'node_modules/angular-scenario/angular-scenario',
        'angular-stable': 'node_modules/angular-stable/angular-stable',
        'angular-messages': 'node_modules/angular-messages/angular-messages',
        'require': 'node_modules/requirejs/require',
        'rx': 'node_modules/rx/dist/rx.all',
        'rxjquery': 'node_modules/rxjs-jquery/rx.jquery',
        'lodash': 'node_modules/lodash/index',
        'i18n': 'node_modules/angular-internationalization/index',

        'bootstrap': 'node_modules/bootstrap/dist/js/bootstrap',

        // Common components

        // Major libraries
        'jquery': 'node_modules/jquery/dist/jquery',
        'jqueryUI': 'node_modules/jquery-ui/jquery-ui',
        'angular-ui-bootstrap': 'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls',
        'angular-ui-grid': 'node_modules/angular-ui-grid/ui-grid'
    },
    shim: {
        'angular-lodash'         : {deps: ['angular', 'lodash']},
        'lodash': {
            exports: '_'
        },
        'angular': {
            deps: ["lodash", "jquery"],
            exports: "angular"
        },
        'angular-aria': {
            deps: ["angular"]
        },
        'angular-route': {
            deps: ["angular"]
        },
        'angular-resource': {
            deps: ["angular"]
        },
        'angular-animate': {
            deps: ["angular"]
        },
        'angular-cookies': {
            deps: ["angular"]
        },
        'angular-sanitize': {
            deps: ["angular"]
        },
        'angular-internationalization': {
            deps: ["angular"]
        },
        'angular-messages': {
            deps: ["angular"]
        },
        'bootstrap': {
            deps: ["jquery"]
        },
        // Common component shims
        'angular-bootstrap': {deps: ['angular'], exports: 'angular-bootstrap'},
        'angular-ui-grid': {deps:['angular', 'angular-aria']},
        'angular-touch': {deps: ['angular'], exports: 'angular-touch'},
        'jquery': {exports: "$"},
        'jqueryUI': {deps: ["jquery"]},
        'bootstrapModal': {deps: ["jquery"], exports: "bootstrapModal"},
        'i18n': {deps: ["jquery"], exports: "$"},
        'json2': {deps: ["jquery"], exports: "json2"},
        'ext': {exports: "ext"},
        'sch': {deps: ["ext"], exports: "sch"},
        'rx': {deps: ["jquery"], "exports": "rx"},
        'angular-gridster': {deps: ['angular']},
        'angular-ui-bootstrap': ['angular'],
        'rxjquery': {deps: ["jquery", "rx"]}
    },
    waitSeconds: 0,
    priority: [
        "angular"
    ]
});
