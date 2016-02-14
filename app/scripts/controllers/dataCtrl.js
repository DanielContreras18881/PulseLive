'use strict';
    /**
     * Principal controller of the app
     * Added $scope to manage data
     */
    function PrincipalController ($scope) {
      //Setting a number version for the app
      $scope.version = '1.0.0';
    };
    //Add the controller to the app
    app.controller('PrincipalController', PrincipalController);
