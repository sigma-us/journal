(function () {
    'use strict';
    angular.module('starter.layout')
        .controller('layoutController', LayoutController)

    LayoutController.$inject = ['journalService'];

    function LayoutController(journalService) {
        'use strict';
        var vm = this;
        vm.$onInit = () => {

        }
        vm.openNav = () => {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }
        
        /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
        vm.closeNav = () => {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
    }
})();