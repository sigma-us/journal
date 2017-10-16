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
        vm.delete = entry => {
            journalService.remove(entry._id)
            .then(_onDeleteSuccess)
            .catch(_onError);
        }   

        function _onDeleteSuccess(res) {
            console.log(res);
        }
        function _onError(err) {
            console.log(err);
        }
        



    }
})();