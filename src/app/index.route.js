(function () {
  'use strict';

  angular
    .module('inspinia')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {

    $locationProvider.hashPrefix('!');

    localStorageServiceProvider.setPrefix('giphyStorage');

    $urlRouterProvider.otherwise("/index/search-image");

    $stateProvider

      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.myCollection', {
        url: "/my-collection",
        templateUrl: "app/myCollection/myCollection.html",
        controller: 'myCollectionController',
        controllerAs: '$ctr',
        data: {pageTitle: 'My Collection'}
      })
      .state('index.searchImage', {
        url: "/search-image",
        templateUrl: "app/searchImage/searchImage.html",
        controller: 'searchImageController',
        controllerAs: '$ctr',
        data: {pageTitle: 'Search Image'}
      })
      .state('login', {
        url: "/login",
        templateUrl: "app/login/login.html",
        controller: 'loginController',
        controllerAs: '$ctr',
        data: {pageTitle: 'Login'}
      })
  }

})();
