(function () {
  'use strict';

  var controller = function ($log, api, localStorageService, appConfig, image, auth, $state) {

    if (!auth.authentication.isLogged) {
      $state.go('login');
      return;
    }

    var that = this;

    that.api = api;

    that.form = {};

    that.images = [];

    that.imageService = image;

    that.newFile = {
      file: null,
      source_image_url: null,
      tags: null
    };

    that.inRequest = false;

    that.appConfig = appConfig;

    var _myCollectionIds;

    var _collectionStoragePrefix = appConfig.myCollectionStorage;

    var _resetNewFileModel = function () {
      that.newFile = {
        file: null,
        source_image_url: null,
        tags: null
      };

      that.form.$setPristine();
      that.form.$setUntouched();
    };

    that.getMyCollection = function () {
      _myCollectionIds = localStorageService.get(_collectionStoragePrefix);

      if (_myCollectionIds) {

        if (!_myCollectionIds.ids.length) {
          that.images = [];
          return
        }

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
      that.imageService.removeImageById(id);
      that.getMyCollection();
    };

    that.uploadFiles = function () {

      if (!that.form.$valid || (!that.newFile.file && !that.newFile.source_image_url)) return;

      that.inRequest = true;
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
        that.inRequest = false;
        var id = res.data.data.id;
        try {
          that.imageService.addImageId(id);
          that.getMyCollection();
          _resetNewFileModel();
        } catch (e) {
          $log.debug(e)
        }
      }, function (error) {
        $log.debug(error)
      });
    }


  };

  controller.$inject = ['$log', 'api', 'localStorageService', 'appConfig', 'image', 'auth', '$state'];


  angular.module('inspinia')
    .controller('myCollectionController', controller);


})();
