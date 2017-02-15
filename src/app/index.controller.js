(function () {
  'use strict';

  angular.module('inspinia')
    .controller('indexController', ['auth', '$state', '$scope', function (auth, $state, $scope) {

      $scope.logout = function () {
        console.log('index')
        auth.logOut();
        $state.go('login')
      }
    }]);


})();
