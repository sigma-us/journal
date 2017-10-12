
/* global $ angular */
'use strict';

$(function () {
    // moment.js default language
    // moment.locale('en')

    angular.bootstrap(document, ['starter']);
});
'use strict';

(function () {
    'use strict';

    angular.module('starter', [
    //3rd party
    'ui.router', 'ui.bootstrap', 'mwl.calendar',

    //layout
    'starter.layout',
    //views/controllers
    'starter.home']).config(RouteConfig).run(function ($rootScope, $document, $window) {

        $rootScope.$on("$stateChangeError", console.log.bind(console));
        $rootScope.$on("$stateChangeSuccess", function () {
            $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
        });
    });

    RouteConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
    }
})();
"use strict";

/* global angular */
(function () {
    "use strict";

    angular.module("starter.home", ["ui.router"]).config(RouteConfig);

    RouteConfig.$inject = ["$stateProvider"];

    function RouteConfig($stateProvider) {
        $stateProvider.state("app.home", {
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
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('starter.layout', ["ui.router"]).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        console.log('hey this is the module');
        $stateProvider.state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: '/public/modules/layout/layout.html',
                    controller: 'layoutController as layoutCtrl'
                }
            }
        });
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('starter.home').controller('homeController', HomeController);

    HomeController.$inject = ['moment'];

    function HomeController(moment) {
        'use strict';

        var vm = this;
        vm.$onInit = function () {
            vm.calendarView = 'month';
            vm.viewDate = moment(new Date());
            vm.events = [];
        };
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('starter.layout').controller('layoutController', LayoutController);

    LayoutController.$inject = [];

    function LayoutController() {
        'use strict';

        var vm = this;
        vm.$onInit = function () {
            console.log('hey I loaded my layout controller!');
        };
    }
})();