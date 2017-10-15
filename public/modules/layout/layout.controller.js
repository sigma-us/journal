(function () {
    'use strict';
    angular.module('starter.layout')
        .controller('layoutController', LayoutController)

    LayoutController.$inject = ['journalService'];

    function LayoutController(journalService) {
        'use strict';
        var vm = this;
        vm.$onInit = () => {
            journalService.getAll()
            .then(_onGetSuccess)
            .catch(_onError);
            console.log('hey I loaded my layout controller!')
        }
        function _onGetSuccess(res) {
            vm.entries = res.items;
            console.log(vm.entries);
        }
        function _onError(err){
            console.log(err);
        }
    }
})();