(function () {
    'use strict';
    angular.module('starter.list')
        .controller('listController', ListController)

        ListController.$inject = ['entries', 'journalService', 'moment'];

    function ListController(entries, journalService, moment) {
        'use strict';
        var vm = this;
        vm.$onInit = () => {
            vm.entries = entries;
            console.log(vm.entries);
        }
        


    }
})();