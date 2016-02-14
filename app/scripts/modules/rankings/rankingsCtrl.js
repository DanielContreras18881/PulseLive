'use strict';
    /**
     * Controller to manage Ranknig
     * Added $scope to manage data
     */
    function RankingsController (Rankings,$scope) {
      //Initialize the array
      $scope.rankingList=[];
      //Call the service to get the Ranking
      Rankings.query()
        .$promise.then(
          //Success
          function (data) {
            console.log('Getting Ranking');
            $scope.rankingList = data;
          },
          //Error
          function (error) {
            console.log(error);
          }
      );

    };
    //Add the controller to the app
    app.controller('RankingsController', RankingsController);
