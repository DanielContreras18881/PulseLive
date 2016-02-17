'use strict';
    /**
     * Module to group the services
     */
    angular.module('rankings.services', ['ngResource']);
    /**
     * Getting Rankings from JSON MOCK
     * Added $resource to make te call
     * Added constant with location of mock
     */
    function Rankings ($resource, Mock_Rankings) {
      console.log('Getting the Ranking');
      return $resource(Mock_Rankings);
    };
    /**
     * Getting Matches from JSON MOCK
     * Added $resource to make te call
     * Added constant with location of mock
     */
    function Matches ($resource, Mock_Matches) {
      console.log('Getting the Matches');
      return $resource(Mock_Matches);
    };
    /**
     * File reader to get data from inputFile directive
     */
    function fileReader ($q) {
        /**
         * Event raised when file is finished load
         */
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        /**
         * Event raised when file load gets an error
         */
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
        /**
         * Create the file reader with the events
         */
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };
        /**
         * Read the content of the file as text with a promise with the reader defined
         */
        var readAsText = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsText(file);
            return deferred.promise;
        };

        return {
            readAsText: readAsText
        };
    };
    /**
    * Manage JSON data in localStorage
    */
    function LocalStorage(){
      /**
       * Save key-value pair in local storage
       */
      var set = function (key, value) {
          localStorage.setItem(key, JSON.stringify(value));
      };
      /**
       * Get vale of the key of the local storage
       */
      var get = function (key) {
        var resultado = localStorage.getItem(key);
        if (resultado !== null && resultado !== 'undefined' && resultado !== undefined) {
            return JSON.parse(resultado);
        } else {
            return null;
        }
      };

      return {
          set: set,
          get:get
      };
    };
    /**
     * Add the functions and constants to the module
     */
    angular.module('rankings.services')
      .constant('Mock_Matches', './mockData/match.json')
      .constant('Mock_Rankings', './mockData/rankings.json')
      .factory('Rankings', Rankings)
      .factory('Matches', Matches)
      .factory('fileReader', fileReader)
      .factory('LocalStorage', LocalStorage);
