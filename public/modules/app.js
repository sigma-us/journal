(function () {
'use strict';
    angular
        .module('starter', [
            //3rd party
            'ui.router',
            'ui.bootstrap',

            //views/controllers
            'starter.layout'
        ])
        .config(RouteConfig)
        .run(function($rootScope, $document, $window, settings) {


            $rootScope.$on("$stateChangeError", console.log.bind(console));
            $rootScope.$on("$stateChangeSuccess", function() {
                $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
            });
        });

    RouteConfig.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
    }

})();