/* global angular */
(function() {
    'use strict'

    angular.module('starter.layout', ['ui.router'])
        .config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
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
})()
