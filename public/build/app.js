
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
    'ui.router', 'ui.bootstrap', 'ngAnimate', 'mwl.calendar', 'starter.services',
    //layout
    'starter.layout',
    //views/controllers
    'starter.home', 'starter.list']).config(RouteConfig).run(function ($rootScope, $document, $window) {

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
                    controller: 'layoutController as rootCtrl'
                }
            }
        });
    }
})();
"use strict";

/* global angular */
(function () {
    "use strict";

    angular.module("starter.list", ["ui.router"]).config(RouteConfig);

    RouteConfig.$inject = ["$stateProvider"];

    function RouteConfig($stateProvider) {
        $stateProvider.state("app.list", {
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
        return journalService.getAll().then(function (data) {
            return data.items;
        }).catch(function (error) {
            console.log(error);
        });
    }
})();
'use strict';

/* global angular */
(function () {
	'use strict';

	// ngFileUpload is required to run "Upload" in service module

	angular.module('starter.services', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('starter.home').controller('homeController', HomeController);

  HomeController.$inject = ['calendarConfig', 'journalService', 'moment'];

  function HomeController(calendarConfig, journalService, moment) {
    'use strict';

    var vm = this;
    vm.$onInit = function () {
      vm.submitButton = 'Submit';
    };

    vm.submitEntry = function () {
      vm.formData.feelings = [];
      vm.formData.feelings[0] = vm.feelings;
      journalService.insert(vm.formData).then(_onInsertSuccess).catch(_onError);
    };
    function _onInsertSuccess(res) {
      console.log(res);
    }
    function _onError(err) {
      console.log(err);
    }

    //calendar code

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
      alert(event);
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

    LayoutController.$inject = ['journalService'];

    function LayoutController(journalService) {
        'use strict';

        var vm = this;
        vm.$onInit = function () {
            journalService.getAll().then(_onGetSuccess).catch(_onError);
            console.log('hey I loaded my layout controller!');
        };
        function _onGetSuccess(res) {
            vm.entries = res.items;
            console.log(vm.entries);
        }
        function _onError(err) {
            console.log(err);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('starter.list').controller('listController', ListController);

    ListController.$inject = ['entries', 'journalService', 'moment'];

    function ListController(entries, journalService, moment) {
        'use strict';

        var vm = this;
        vm.$onInit = function () {
            vm.entries = entries;
            console.log(vm.entries);
        };
    }
})();
'use strict';

/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict';

    angular.module('starter.services').factory('journalService', JournalServiceFactory);

    JournalServiceFactory.$inject = ['$http', '$q'];

    function JournalServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove,
            archiveUpdate: archiveUpdate
        };

        function getAll() {
            return $http.get('/api/journals').then(xhrSuccess).catch(onError);
        }

        function getById(id, onSuccess, onError) {
            return $http.get('/api/journals/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(journalData, onSuccess, onError) {
            return $http.post('/api/journals', journalData).then(xhrSuccess).catch(onError);
        }

        function update(journalData, onSuccess, onError) {
            return $http.put('/api/journals/' + journalData._id, journalData).then(xhrSuccess).catch(onError);
        }

        function remove(id, onSuccess, onError) {
            return $http.delete('/api/journals/' + id).then(xhrSuccess).catch(onError);
        }
        function archiveUpdate(archiveData, onSuccess, onError) {
            return $http.put('/api/journals/archive/' + archiveData.id, archiveData).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data);
        }
    }
})();