(function () {
  'use strict';

  var controller = function ($log, api, localStorageService, appConfig) {

    $log.debug('myCollectionController');

    var that = this;

    that.api = api;

    that.form = {};

    that.newFile = {
      file: null,
      source_image_url: null,
      tags: null
    };

    that.inReuest = false;

    var _myCollectionIds;

    that.appConfig = appConfig;

    var _collectionStoragePrefix = appConfig.myCollectionStorage;

    that.getMyCollection = function () {
      _myCollectionIds = localStorageService.get(_collectionStoragePrefix);

      if (_myCollectionIds) {

        if (!_myCollectionIds.ids.length) return;
        var m = _myCollectionIds.ids.join(',');

        that.api.getMyImagesCollection(m).then(function (res) {
          try {
            that.images = res.data.data
          } catch (e) {
            $log.debug(e)
          }
        });
      }
    };

    that.getMyCollection();

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

      that.getMyCollection();

    };

    that.uploadFiles = function () {

      // TODO 401 error -  waiting for approve my account from Giphy team

      if (!that.form.$valid || !that.newFile.file) return;

      var tags = that.newFile.tags.map(function (elem) {
        return elem.text;
      }).join(",");


      var m = {
        username: that.appConfig.giphyUsername,
        api_key: that.appConfig.giphyPublicBetaKey,
        file: that.newFile.file,
        source_image_url: that.newFile.source_image_url,
        tags: tags
      };

      that.api.uploadFile(m).then(function (res) {
        console.log(res)
      }, function (error) {
        $log.debug(error)
      });
    }


  };

  controller.$inject = ['$log', 'api', 'localStorageService', 'appConfig'];


  angular.module('inspinia')
    .controller('myCollectionController', controller);


})();
