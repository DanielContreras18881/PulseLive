'use strict';
    /**
     * Controller to manage Ranknig
     * Added $scope to manage data
     */
    function RankingsController (Rankings,$scope,LocalStorage) {
      /**
       * Initialize the directive
       */
      $scope.init = function(){
        //Initialize the array
        $scope.rankingList=[];
        $scope.indexRankingSelected = -1;
        //Check persistence data on local storage
        if(LocalStorage.get('ranking')===null){
          //Call the service to get the Ranking
          Rankings.query()
            .$promise.then(
              //Success
              function (data) {
                console.log('Getting Mock Ranking');
                $scope.rankingList = data;
                LocalStorage.set('ranking',data);
              },
              //Error
              function (error) {
                console.log(error);
              }
          );
        }else{
          console.log('Getting Data Ranking');
          $scope.rankingList = LocalStorage.get('ranking');
        }
      };
      /**
       * Row selected from ranking table
       */
      $scope.selected = function (position){
        $scope.postionRankingSelected = position.pos;
        $scope.teamSelected = position.team.name;
      }

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
