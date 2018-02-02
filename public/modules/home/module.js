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
            })
            .state("app.home.edit", {
                url: "edit/:id",
                views: {
                    "content@app": {
                        templateUrl: "/public/modules/home/home.html",
                        controller: "homeController as homeCtrl"
                    }
                }
            });
    }
})();