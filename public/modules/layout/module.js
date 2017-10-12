/* global angular */
(function() {
    'use strict'

    angular.module('starter.layout', ["ui.router"])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        console.log('hey this is the module')
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: '/public/modules/layout/layout.html',
                        controller: 'layoutController as layoutCtrl'
                    }
                }
            })
    }
})();
