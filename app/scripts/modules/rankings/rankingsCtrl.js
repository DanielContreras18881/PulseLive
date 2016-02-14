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
    function FileRankingController ($scope,$modalInstance,fileReader) {
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
      			$modalInstance.close($scope.rankingData);
      };
      /**
       * Get the Ranking data from the file
       */
      $scope.readFile = function () {
          fileReader.readAsText($scope.file, $scope)
                        .then(function(result) {
                            $scope.rankingData = JSON.parse(result);
                        });
      };

    };
    //Add the controller to the app
    app.controller('RankingsController', RankingsController);
    app.controller('FileRankingController', FileRankingController);
