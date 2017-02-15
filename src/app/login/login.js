(function () {

  "use strict";

  function loginController($state, auth) {

    if (auth.authentication.isLogged) {
      $state.go('index.searchImage');
      return;
    }

    var that = this;

    that.loginForm = {};

    that.m = {
      email: null,
      password: null,
      inRequest: false
    };


    that.login = function (form) {

      if (!form.$valid) {
        return
      }

      that.m.inRequest = true;
      var m = {username: that.m.email, password: that.m.password};
      auth.login(m).then(function () {
        that.m.inRequest = false;
        $state.go('index.searchImage');
      }, function (error) {
        console.log(error);
        that.m.inRequest = false;
      });
    };

  }

  loginController.$inject = ['$state', 'auth'];

  angular.module('inspinia').controller('loginController', loginController)

})();
