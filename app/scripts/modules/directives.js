'use strict';

  app.directive('rankings', function(){
      return {
        restrict: 'E',

        templateUrl: 'views/rankings/rankings.html',
        controller:'RankingsController'


      };
  });

  app.directive('directives', function(){
      return {
        restrict: 'E',

        templateUrl: 'views/matches/matches.html',
        controller:'MatchesController'


      };
  });
