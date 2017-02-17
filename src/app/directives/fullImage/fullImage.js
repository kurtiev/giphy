(function () {
  'use strict';

  var fullImage = function (imageService, localStorageService, appConfig) {
    return {
      templateUrl: 'app/directives/fullImage/template.html',
      restrict: 'E',
      link: function (scope, el, attr) {

        scope.isShow = false;

        var _myCollectionIds = localStorageService.get(_collectionStoragePrefix);
        var _collectionStoragePrefix = appConfig.myCollectionStorage;


        /**
         * Adding image ID into localStorage
         * @param image
         */
        scope.addImageToMyCollection = function (image) {

          var id = image.id;
          imageService.addImageId(id);

        };

        /**
         * Delete image from localStorage
         * @param image
         */
        scope.removeImageFromMyCollection = function (image) {

          var id = image.id;

          imageService.removeImageById(id);
        };


        /**
         * Function for ng-show button, if image already exist in our localStorage
         * @param image
         * @returns {boolean}
         */
        scope.existedImageFilter = function (image) {
          var id = image.id;

          _myCollectionIds = localStorageService.get(_collectionStoragePrefix) || {ids: []};

          for (var i = 0; _myCollectionIds.ids.length > i; i++) {
            if (_myCollectionIds.ids[i] == id) {
              return true
            }
          }

          return false;

        };

      },
      scope: {
        image: '='
      }
    }
  };

  fullImage.$inject = ['image', 'localStorageService', 'appConfig'];

  angular.module('inspinia').directive('fullImage', fullImage);

})();
