(function () {
    'use strict';
    angular.module('starter.layout')
        .controller('layoutController', LayoutController)

    LayoutController.$inject = [];

    function LayoutController() {
        'use strict';
        var vm = this;
        vm.$onInit = () => {
            console.log('hey I loaded my layout controller!')
        }

    }
})();