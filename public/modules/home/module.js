/* global angular */
(function () {
    "use strict";

    angular.module("starter.home", ["ui.router"]).config(RouteConfig); 

    RouteConfig.$inject = ["$stateProvider"];
    
    function RouteConfig($stateProvider) {
        $stateProvider
            .state("app.home", {
                url: "/",
                views: {
                    "content@app": {
                        templateUrl: "/public/modules/home/home.html",
                        controller: "homeController as homeCtrl"
                    }
                }
            });
    }
})();