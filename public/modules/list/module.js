/* global angular */
(function () {
    "use strict";

    angular.module("starter.list", ["ui.router"]).config(RouteConfig);

    RouteConfig.$inject = ["$stateProvider"];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("app.list", {
                url: "/list",
                views: {
                    "content@app": {
                        templateUrl: "/public/modules/list/list.html",
                        controller: "listController as listCtrl",
                        resolve: {
                            entries: getAllEntries
                        }
                    }
                }
            });
    }
    function getAllEntries(journalService) {
        return journalService
            .getAll()
            .then(data => {
                return data.items;
            })
            .catch(error => {
                console.log(error);
            });

    }
})();