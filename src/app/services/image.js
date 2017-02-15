(function () {
  'use strict';

  var image = function (appConfig, localStorageService) {

    var _collectionStoragePrefix = appConfig.myCollectionStorage;

    var _myCollectionIds = localStorageService.get(_collectionStoragePrefix);

    var factory = {};

    factory.addImageId = function (id) {

      _myCollectionIds = localStorageService.get(_collectionStoragePrefix) || {ids: []};

      for (var i = 0; _myCollectionIds.ids.length > i; i++) {
        if (_myCollectionIds.ids[i] == id) {
          // image ID already exist
          return
        }
      }

      _myCollectionIds.ids.push(id);

      localStorageService.set(_collectionStoragePrefix, _myCollectionIds);

    };

    factory.removeImageById = function (id) {

      _myCollectionIds = localStorageService.get(_collectionStoragePrefix);

      for (var i = 0; _myCollectionIds.ids.length > i; i++) {
        if (_myCollectionIds.ids[i] == id) {
          _myCollectionIds.ids.splice(i, 1);
          break;
        }
      }

      localStorageService.set(_collectionStoragePrefix, _myCollectionIds);

    };

    return factory;

  };

  image.$inject = ['appConfig', 'localStorageService'];

  angular.module('inspinia')
    .factory('image', image);

})();
