'use strict';
    /**
     * Controller to manage Matches
     * Added $scope to manage data
     */
    function MatchesController (Matches,$scope) {
      //Initialize the array
      $scope.matchesList=[];
      //Call the service to get the Matches
      Matches.query()
        .$promise.then(
          //Success
          function (data) {
            console.log('Getting Matches');
            $scope.matchesList = data;
          },
          //Error
          function (error) {
            console.log(error);
          }
      );

    };
    //Add the controller to the app
    app.controller('MatchesController', MatchesController);
