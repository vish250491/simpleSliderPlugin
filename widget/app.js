'use strict';
(function (angular, buildfire) {
  angular
    .module('simpleSliderPluginWidget', [])
      .directive("buildFireCarousel", ["$rootScope", '$timeout', function ($rootScope, $timeout) {
        return {
          restrict: 'A',
          link: function (scope, elem, attrs) {
            $timeout(function () {
              $rootScope.$broadcast("Carousel:LOADED");
            }, 0);
          }
        };
      }])

})(window.angular, window.buildfire);

