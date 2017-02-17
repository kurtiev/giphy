(function () {
  'use strict';

  var controller = function ($log, api, localStorageService, appConfig, auth, $state) {

    if (!auth.authentication.isLogged) {
      $state.go('login');
      return;
    }

    var that = this;

    that.api = api;

    that.form = {};

    that.keyword = null;

    that.images = [];

    that.inRequest = false;

    that.searchModel = {
      q: null,
      limit: 25,
      offset: 0
    };

    /**
     * Search image by his name
     */
    that.getImageByName = function () {

      if (!that.form.$valid) return;

      that.inRequest = true;

      var m = {
        q: that.searchModel.q,
        limit: that.searchModel.limit,
        offset: that.searchModel.offset
      };


      that.api.getImageByName(m).then(function (res) {
        that.inRequest = false;
        try {
          that.images = res.data.data;
        } catch (e) {
          $log.debug(e)
        }
      });
    };

    /**
     * Infinite scroll, pagination
     */
    that.infiniteScroll = function (form) {

      if (that.inRequest || !form.$valid) return;

      that.inRequest = true;

      that.searchModel.offset = that.images.length + that.searchModel.limit;

      var m = {
        q: that.searchModel.q,
        limit: that.searchModel.limit,
        offset: that.searchModel.offset
      };

      that.api.getImageByName(m).then(function (res) {
        that.inRequest = false;
        try {
          that.images = that.images.concat(res.data.data)
        } catch (e) {
          $log.debug(e)
        }
      });

    };

  };

  controller.$inject = ['$log', 'api', 'localStorageService', 'appConfig', 'auth', '$state'];


  angular.module('inspinia')
    .controller('searchImageController', controller);


})();
