(function () {
  'use strict';

  var api = function ($http, appConfig) {

    var giphyKey = appConfig.giphyPublicBetaKey;
    var apiUrl = appConfig.apiUrl;
    var factory = {};

    factory.getImageByName = function (search) {

      var searchModel = {
        q: search.q,
        limit: search.limit,
        offset: search.offset,
        api_key: giphyKey
      };

      return $http({
        method: 'GET',
        url: apiUrl + 'v1/gifs/search',
        params: searchModel
      });
    };

    factory.getMyImagesCollection = function (ids) {

      var searchModel = {
        ids: ids,
        api_key: giphyKey
      };

      return $http({
        method: 'GET',
        url: apiUrl + 'v1/gifs',
        params: searchModel
      });
    };

    factory.uploadFile = function (requestModel) {
      return $http.post('http://upload.giphy.com/v1/gifs', requestModel)
    };

    return factory;

  };

  api.$inject = ['$http', 'appConfig'];

  angular.module('inspinia')
    .factory('api', api);

})();
