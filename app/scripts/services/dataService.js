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
     * Add the functions and constants to the module
     */
    angular.module('rankings.services')
      .constant('Mock_Matches', './mockData/match.json')
      .constant('Mock_Rankings', './mockData/rankings.json')
      .factory('Rankings', Rankings)
      .factory('Matches', Matches);
