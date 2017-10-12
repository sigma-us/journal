(function () {
    'use strict';
    angular.module('starter.home')
        .controller('homeController', HomeController)

    HomeController.$inject = ['moment'];

    function HomeController(moment) {
        'use strict';
        var vm = this;
        vm.$onInit = () => {
            vm.calendarView = 'month';
            vm.viewDate = moment(new Date());
            vm.events = [];
        }

    }
})();