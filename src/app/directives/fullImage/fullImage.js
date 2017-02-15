(function () {
  'use strict';

  var fullImage = function () {
    return {
      restrict: 'AE',
      link: function (scope, el, attr) {

        scope.isShow = false;

        $(el).append('<div class="fullImageBox hidden"><div class="fullImageBoxContainer"><img src="' + scope.image + '" class="image" alt="" ng-click="showHide()"></div></div>');

        $(el).click(function (event) {

          if (event.target.nodeName != 'SPAN' && event.target.nodeName != 'BUTTON') {
            scope.isShow = !scope.isShow;
            if (scope.isShow) {
              $(el).find('.fullImageBox').removeClass('hidden')
            } else {
              $(el).find('.fullImageBox').addClass('hidden')
            }
          }
        })

      },
      scope: {
        image: '='
      }
    }
  };

  angular.module('inspinia').directive('fullImage', fullImage);

})();
