
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

  HomeController.$inject = ['calendarConfig', 'moment'];

  function HomeController(calendarConfig, moment) {
    'use strict';

    var vm = this;
    vm.$onInit = function () {};
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function onClick(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function onClick(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
    vm.events = [];

    vm.cellIsOpen = false;

    vm.addEvent = function () {
      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    vm.eventClicked = function (event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function (event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function (event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function (event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function ($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function (date, cell) {

      if (vm.calendarView === 'month') {
        if (vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day')) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if (vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month')) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }
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