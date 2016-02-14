'use strict';
    /**
     * Controller to manage Ranknig
     * Added $scope to manage data
     */
    function RankingsController (Rankings,$scope) {
      /**
       * Initialize the directive
       */
      $scope.init = function(){
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

    };

    /**
     * Controller to manage Ranking file
     * Added $scope to manage data
     */
    function FileRankingController ($scope,$modalInstance) {
      /**
       * Close modal
       */
      $scope.close = function(){
      			$modalInstance.dismiss();
      };
      /**
       * Save File Data
       */
      $scope.save = function(){
      			$modalInstance.close();
      };

    };
    //Add the controller to the app
    app.controller('RankingsController', RankingsController);
    app.controller('FileRankingController', FileRankingController);
