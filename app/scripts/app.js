'use strict';

    var app = angular.module('rankings', ['ngRoute',
                                          'ui.bootstrap',
                                          'dialogs.main',
                                          'rankings.services']);

    function config ($locationProvider,$routeProvider) {
      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: 'views/principal.html',
          controller: 'PrincipalController'
        });
    };

    app.config(config);

    app.directive('ranking', function(){
        return {
          restrict: 'E',
          templateUrl: 'scripts/modules/rankings/rankings.html',
          controller:'RankingsController'
        };
    });

    app.directive('matchlist', function(){
        return {
          restrict: 'E',
          templateUrl: 'scripts/modules/matches/matches.html',
          controller:'MatchesController'
        };
    });
