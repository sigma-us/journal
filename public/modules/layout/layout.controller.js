(function () {
    'use strict';
    angular.module('starter.layout')
        .controller('layoutController', LayoutController)

        LayoutController.$inject = ['$state', '$window'];

    function LayoutController($state, $window) {
        'use strict';
        var vm = this;
        
        vm.$onInit = () => {
            console.log('hey I loaded my first controller!')
        }

    }
})();