(function () {
  'use strict';

  var api = function ($http, appConfig, Upload) {

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
     return Upload.upload({
        url: 'http://upload.giphy.com/v1/gifs',
        data: requestModel
      });
       // .then(function (resp) {
       //  console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      // }, function (resp) {
      //   console.log('Error status: ' + resp.status);
      // }, function (evt) {
      //   var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //   console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      // });
    };

    return factory;

  };

  api.$inject = ['$http', 'appConfig', 'Upload'];

  angular.module('inspinia')
    .factory('api', api);

})();
