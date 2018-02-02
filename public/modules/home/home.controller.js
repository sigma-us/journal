(function () {
    'use strict';
    angular.module('starter.home')
        .controller('homeController', HomeController)

    HomeController.$inject = ['$state', 'calendarConfig', 'journalService', 'moment'];

    function HomeController($state, calendarConfig, journalService, moment) {
        'use strict';
        var vm = this;
        var weekdayKey = {
          0: 'Sun',
          1: 'Mon',
          2: 'Tues',
          3: 'Wed',
          4: 'Thur',
          5: 'Fri',
          6: 'Sat'
        }

        vm.$onInit = () => {
          vm.formData = {};
          vm.formData.privacy = 'public';
          vm.date = new Date();
          var dayKey = vm.date.getDay();
          vm.day = weekdayKey[dayKey];
          if ($state.params.id) {
            editMode();
            journalService.getById($state.params.id)
            .then(res => {
              vm.formData = res.item;
            })
            .catch(err => {
              console.log(err);
            });
          } else {
            addMode();
          }
        }

        vm.togglePrivacy = () => {
          if (vm.formData.privacy === 'public'){
            vm.formData.privacy = 'private';
          } else {
            vm.formData.privacy = 'public';
          }
        }
        
        vm.submit = () => {
          vm.formData.date = vm.date;
          if (!$state.params.id){
            journalService.insert(vm.formData)
            .then(_onInsertSuccess)
            .catch(_onError);
          } else {
            journalService.update(vm.formData)
            .then(_onInsertSuccess)
            .catch(_onError);
          }
        }
        function _onInsertSuccess(res) {
          $state.go('app.list');
        }
        function _onError(err){
          console.log(err);
        }

        function editMode() {
          vm.submitButton = 'Update Now';
        }
        function addMode() {
          vm.submitButton = 'Save Now'
        }


        //calendar code

        vm.calendarView = 'month';
        vm.viewDate = new Date();
        var actions = [{
          label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
          onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
          }
        }, {
          label: '<i class=\'glyphicon glyphicon-remove\'></i>',
          onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
          }
        }];
        vm.events = [
          
        ];
    
        vm.cellIsOpen = false;
    
        vm.addEvent = function() {
          vm.events.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            color: calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
          });
        };
    
        vm.eventClicked = function(event) {
          alert(event);
        };
    
        vm.eventEdited = function(event) {
          alert.show('Edited', event);
        };
    
        vm.eventDeleted = function(event) {
          alert.show('Deleted', event);
        };
    
        vm.eventTimesChanged = function(event) {
          alert.show('Dropped or resized', event);
        };
    
        vm.toggle = function($event, field, event) {
          $event.preventDefault();
          $event.stopPropagation();
          event[field] = !event[field];
        };
    
        vm.timespanClicked = function(date, cell) {
    
          if (vm.calendarView === 'month') {
            if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
              vm.cellIsOpen = false;
            } else {
              vm.cellIsOpen = true;
              vm.viewDate = date;
            }
          } else if (vm.calendarView === 'year') {
            if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
              vm.cellIsOpen = false;
            } else {
              vm.cellIsOpen = true;
              vm.viewDate = date;
            }
          }
        };

    }
})();