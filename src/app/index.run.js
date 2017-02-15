(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, auth) {
    $log.debug('runBlock end');
    auth.fillAuthData();
  }

})();
