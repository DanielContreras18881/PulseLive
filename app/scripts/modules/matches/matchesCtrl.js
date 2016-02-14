'use strict';
    /**
     * Controller to manage Matches
     * Added $scope to manage data
     */
    function MatchesController (Matches,$scope) {
      /**
       * Initialize the directive
       */
      $scope.init = function(){
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
    };

    /**
     * Controller to manage Match Form
     * Added $scope to manage data
     */
    function FormMatchController ($scope,$modalInstance) {
      //Initialize Form Data
      $scope.formData = {
        matchId:Math.floor(Date.now() / 1000),
        home:'',
        visitor:'',
        pointsHome:0,
        pointsVisitor:0,
        status:'',
        outcome:''
      }
      /**
       * Close modal
       */
      $scope.close = function(){
      			$modalInstance.dismiss();
      };
      /**
       * Save Form Data
       */
      $scope.save = function(){
            $scope.formData.status = 'C';
            $scope.formData.outcome = $scope.formData.pointsHome > $scope.formData.pointsVisitor?'A':$scope.formData.pointsHome < $scope.formData.pointsVisitor?'B':'D';
      			$modalInstance.close($scope.formData);
      };

    };

    /**
     * Controller to manage Match File
     * Added $scope to manage data
     */
    function FileMatchController ($scope,$modalInstance) {
      //Initialize Match Data
      $scope.matchData = {
        matchId:'',
        home:'',
        visitor:'',
        pointsHome:0,
        pointsVisitor:0,
        status:'',
        outcome:''
      }
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
      			$modalInstance.close($scope.matchData);
      };

    };

    //Add the controller to the app
    app.controller('MatchesController', MatchesController);
    app.controller('FormMatchController', FormMatchController);
    app.controller('FileMatchController', FileMatchController);
