'use strict';
/**
 * Directive to show a table with the ranking
 */
  app.directive('rankings', function(){
      return {
        restrict: 'E',

        templateUrl: 'scripts/modules/rankings/rankings.html',
        controller:'RankingsController'


      };
  });
/**
 * Directive to show a table with the matches
 */
  app.directive('matcheslistdata', function(){
      return {
        restrict: 'E',

        templateUrl: 'scripts/modules/matches/matches.html',
        controller:'MatchesController'


      };
  });
/**
 * Directive to show a input to get a file or to drag&drop a file
 */
  app.directive('fileInput', function($parse){
    return {
        restrict: "EA",
        template: "<input type='file' />",
        replace: true,
        link: function (scope, element, attrs) {

            var modelGet = $parse(attrs.fileInput);
            var modelSet = modelGet.assign;
            var onChange = $parse(attrs.onChange);

            var updateModel = function () {
                scope.$apply(function () {
                    modelSet(scope, element[0].files[0]);
                    onChange(scope);
                });
            };

            element.bind('change', updateModel);
        }
    };
  });
