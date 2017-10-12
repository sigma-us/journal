
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
    'ui.router', 'ui.bootstrap',

    //views/controllers
    'starter.layout']).config(RouteConfig).run(function ($rootScope, $document, $window, settings) {

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
'use strict';

/* global angular */
(function () {
    'use strict';

    angular.module('starter.layout', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
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

    angular.module('starter.layout').controller('layoutController', LayoutController);

    LayoutController.$inject = ['$state', '$window'];

    function LayoutController($state, $window) {
        'use strict';

        var vm = this;

        vm.$onInit = function () {
            console.log('hey I loaded my first controller!');
        };
    }
})();