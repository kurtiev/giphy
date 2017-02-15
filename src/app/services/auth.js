(function () {

  "use strict";

  var authService = function (api, $q, localStorageService, $rootScope, appConfig, $injector, $state) {

    var that = this;
    that.userData = {
      isLogged: false,
      user: null
    };

    var fakeUser = {
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@gmail.com'
    };

    $rootScope.userData = that.userData;

    var setUser = function (user) {
      that.userData.isLogged = true;
      that.userData.user = user;
      appConfig.token = 'Bearer ' + that.userData.user.access_token;
      $rootScope.userData = that.userData;
      return that.userData;
    };

    var updateMyInfo = function (user) {
      that.userData.user = user;
      localStorageService.set('adminAuthorizationData', {
        authenticationInfo: setUser(user)
      });
    };

    var clearUserData = function () {
      that.userData = {
        isLogged: false,
        user: null
      };
      appConfig.token = null;
      $rootScope.userData = that.userData;
      // Clear all static data and User info
      localStorageService.clearAll();
      var auth = $injector.get('auth');
      auth.authentication = that.userData;
    };

    var login = function (model) {
      var deferred = $q.defer();
      if (model.username == 'admin@gmail.com' && model.password == 'admin') {
        localStorageService.set('adminAuthorizationData', {
          authenticationInfo: setUser(fakeUser)
        });
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    var logOut = function () {
      clearUserData();
      $state.go('login');
    };

    var fillAuthData = function () {

      var authData = localStorageService.get('adminAuthorizationData');
      if (authData) {
        if (authData.authenticationInfo) {
          setUser(authData.authenticationInfo.user);
        }
      }

    };

    return {
      login: login,
      logOut: logOut,
      fillAuthData: fillAuthData,
      setUser: setUser,
      updateMyInfo: updateMyInfo,
      authentication: that.userData
    };
  };

  authService.$inject = ['api', '$q', 'localStorageService', '$rootScope', 'appConfig', '$injector', '$state'];
  angular.module('inspinia').factory('auth', authService);

})();
