'use strict';
    /**
     * Principal controller of the app
     * Added $scope to manage data
     */
    function PrincipalController ($scope,dialogs,$filter) {
      //Setting a number version for the app
      $scope.version = '1.0.0';
      /**
       * Button funcionality for add data to the app
       */
      $scope.addData = function(option){
        switch(option) {
            case 'ranking':
                //Adding ranking data from json file
                var dlgFileRanking = dialogs.create('/views/fileForm.html','FileRankingController');
                dlgFileRanking.result.then(
                  function(data){//Save Modal
                    console.log('Ranking Data Saved');
                    $scope.initRanking(data);
                  },function(){//Close Modal
                    console.log('Ranking File Closed');
                  }
                );
                break;
            case 'matchFile':
                //Adding match data from json file
                var dlgFileMatch = dialogs.create('/views/fileForm.html','FileMatchController');
                dlgFileMatch.result.then(
                  function(data){//Save Modal
                    console.log('Match File Saved');
                    $scope.addMatch(data);
                  },function(){//Close Modal
                    console.log('Match File Closed');
                  }
                );
                break;
            case 'matchForm':
                //Adding match data from form data
                var dlgForm = dialogs.create('/views/matchForm.html','FormMatchController');
                dlgForm.result.then(
                  function(data){//Save Modal
        						console.log('Match Data Saved');
                    $scope.addMatch(data);
        					},function(){//Close Modal
                    console.log('Match Form Closed');
        					}
                );
                break;
        };
      };
      /**
       * Function to add a match
       */
      $scope.addMatch = function(matchData){
        var matchExists = $filter('filter')($scope.matchesList,
                          function(value, index) {return value.matchId === matchData.matchId;})[0];
        if(matchExists!==undefined){
          //Update the match data
          matchExists.scores = matchData.scores;
          matchExists.status = matchData.status;
          matchExists.outcome = matchData.outcome;
          matchData = matchExists;
        }else{
          //New match data
          $scope.matchesList.push(matchData);//Add the match to the match list
        }
        $scope.updateRanking(matchData);//Evaluate the match to update the ranking list
      }
      /**
       * Evaluate the parameter match to update the ranking list
       */
      $scope.updateRanking = function(match){
        if(match.status==='C'){//If the match is completed or
          //Get the home team data
          var homeTeam = $filter('filter')($scope.rankingList,
                                          function(value, index) {return value.team.name === match.teams[0].name;})[0];
          //Get the visitor team data
          var visitorTeam = $filter('filter')($scope.rankingList,
                                          function(value, index) {return value.team.name === match.teams[1].name;})[0];
          if(homeTeam!==undefined && visitorTeam!==undefined){//The teams exist on the ranking
            //It is estimated rating
            var rating = homeTeam.pts + 3 - visitorTeam.pts;
            rating = rating>10?10:rating<-10?-10:rating;
            //Points are calculated based on the result
            if(match.outcome==='A'){
              //Home wins
              var winHome = 1 - rating.toPrecision(2) / 10;
              winHome = winHome.toPrecision(2);
              //Rankig is updated
              homeTeam.pts = parseFloat(homeTeam.pts) + winHome;
              visitorTeam.pts = parseFloat(visitorTeam.pts) - winHome;
            }
            if(match.outcome==='B'){
              //Visitor wins
              var winVisitor = 1 + rating.toPrecision(2) / 10;
              winVisitor = winVisitor.toPrecision(2);
              //Rankig is updated
              homeTeam.pts = parseFloat(homeTeam.pts) - winVisitor;
              visitorTeam.pts = parseFloat(visitorTeam.pts) + winVisitor;
            }
            if(match.outcome==='C'){
              //Draw
              var draw = rating.toPrecision(2) / 10;
              draw = draw.toPrecision(2);
              //Rankig is updated
              homeTeam.pts = parseFloat(homeTeam.pts) + draw;
              visitorTeam.pts = parseFloat(visitorTeam.pts) + draw;
            }
          }else{//One or both teams do not exist on the ranking
            console.log('These teams do not participate in this league! Try again!');
          }
        }
      };
      /**
       * Initialize the ranking with new ranking and erase the match list
       */
      $scope.initRanking = function(data){
        $scope.rankingList = data;
        $scope.matchesList = [];
      }

    };
    //Add the controller to the app
    app.controller('PrincipalController', PrincipalController);
