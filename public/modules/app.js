(function () {
'use strict';
    angular
        .module('starter', [
            //3rd party
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'mwl.calendar',

            //layout
            'starter.layout',
            //views/controllers
            'starter.home'
        ])
        .config(RouteConfig)
        .run(function($rootScope, $document, $window) {


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