(function () {
  'use strict';

  var controller = function ($log, api, localStorageService, appConfig) {

    var that = this;

    that.api = api;

    that.form = {};

    that.keyword = null;

    that.images = [];

    that.inRequest = false;

    var _collectionStoragePrefix = appConfig.myCollectionStorage;

    var _myCollectionIds = localStorageService.get(_collectionStoragePrefix);


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
          that.images = that.images.concat(res.data.data)
        } catch (e) {
          $log.debug(e)
        }
      });
    };


    /**
     * Adding image ID into localStorage
     * @param image
     */
    that.addImageToMyCollection = function (image) {

      var id = image.id;
      var isNewImage = true;

      _myCollectionIds = localStorageService.get(_collectionStoragePrefix) || {ids: []};

      for (var i = 0; _myCollectionIds.ids.length > i; i++) {
        if (_myCollectionIds.ids[i] == id) {
          return
        }
      }

      if (!isNewImage) return;

      _myCollectionIds.ids.push(id);

      localStorageService.set(_collectionStoragePrefix, _myCollectionIds);

    };

    /**
     * Delete image from localStorage
     * @param image
     */
    that.removeImageFromMyCollection = function (image) {

      var id = image.id;

      _myCollectionIds = localStorageService.get(_collectionStoragePrefix);

      for (var i = 0; _myCollectionIds.ids.length > i; i++) {
        if (_myCollectionIds.ids[i] == id) {
          _myCollectionIds.ids.splice(i, 1);
          break;
        }
      }

      localStorageService.set(_collectionStoragePrefix, _myCollectionIds);
    };


    /**
     * Function for ng-show button, if image already exist in our localStorage
     * @param image
     * @returns {boolean}
     */
    that.existedImageFilter = function (image) {
      var id = image.id;

      _myCollectionIds = localStorageService.get(_collectionStoragePrefix) || {ids: []};

      for (var i = 0; _myCollectionIds.ids.length > i; i++) {
        if (_myCollectionIds.ids[i] == id) {
          return true
        }
      }

      return false;

    };

    /**
     * Infinite scroll, pagination
     */
    that.infiniteScroll = function () {

      if (that.inRequest || !that.form.$valid) return;

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

  controller.$inject = ['$log', 'api', 'localStorageService', 'appConfig'];


  angular.module('inspinia')
    .controller('searchImageController', controller);


})();
