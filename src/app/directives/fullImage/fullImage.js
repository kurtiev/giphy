(function () {
  'use strict';

  var fullImage = function () {
    return {
      restrict: 'E',
      link: function (scope, el, attr) {

        scope.isShow = false;

        $(el).append('<div class="fullImageBox hidden"><div class="fullImageBoxContainer">' +
          '<button type="button" class="close"><span class="close-span">&times;</span></button>' +
          '<img src="' + scope.image + '" class="image" alt="" ng-click="showHide()"></div></div>');

        $(el).click(function (event) {

          if (event.target.className == 'close' || event.target.className == 'close-span') {
            scope.isShow = false;
            $(el).find('.fullImageBox').addClass('hidden')
          } else {
            scope.isShow = true;
            $(el).find('.fullImageBox').removeClass('hidden')
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
