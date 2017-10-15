/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module('starter.services')
        .factory('journalService', JournalServiceFactory)

        JournalServiceFactory.$inject = ['$http', '$q']

    function JournalServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove,
            archiveUpdate:archiveUpdate
        }

        function getAll() {
            return $http.get('/api/journals')
                .then(xhrSuccess)
                .catch(onError)
        }

        function getById(id, onSuccess, onError) {
            return $http.get(`/api/journals/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function insert(journalData, onSuccess, onError) {
            return $http.post('/api/journals', journalData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(journalData, onSuccess, onError) {
            return $http.put(`/api/journals/${journalData._id}`, journalData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function remove(id, onSuccess, onError) {
            return $http.delete(`/api/journals/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }
        function archiveUpdate(archiveData, onSuccess, onError) {
            return $http.put(`/api/journals/archive/${archiveData.id}`,archiveData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function xhrSuccess(response) {
            return response.data
        }
      

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data)
        }
    }
})();
