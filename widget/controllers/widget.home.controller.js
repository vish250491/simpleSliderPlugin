'use strict';

(function (angular) {
  angular
    .module('simpleSliderPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', '$rootScope',
      function ($scope, Buildfire, DataStore, TAG_NAMES, $rootScope) {
        var WidgetHome = this;
          WidgetHome.view=null;

          $scope.$on("Carousel:LOADED", function () {
              if (!WidgetHome.view) {
                  console.log('if------', WidgetHome.view);
                  WidgetHome.view = new Buildfire.components.carousel.view("#carousel", []);
              }
              if (WidgetHome && WidgetHome.data && WidgetHome.data.content &&  WidgetHome.data.content.carouselImages) {
                  WidgetHome.view.loadItems(WidgetHome.data.content.carouselImages);
              } else {
                  WidgetHome.view.loadItems([]);
              }
          });

        var init = function () {
          var success = function (result) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.content)
                WidgetHome.data.content = {};
              if (!WidgetHome.data.settings)
                WidgetHome.data.settings = {};

              if (!WidgetHome.data.content.carouselImages) {
                $rootScope.itemListbackgroundImage = "";

              } else {
                  $scope.$emit("Carousel:LOADED");
              }
            }
            , error = function (err) {
              console.error('Error while getting data', err);
            };
          DataStore.get(TAG_NAMES.SIMPLE_SLIDER_INFO).then(success, error);

        };

        init();


          Buildfire.datastore.onUpdate(function (event) {
          if (event.tag == TAG_NAMES.SIMPLE_SLIDER_INFO) {
            console.log(">>>>>>>>>>>>>>>", event.data);
              if(event.data && event.data.content){
                  if (!WidgetHome.data.content)
                      WidgetHome.data.content = {};
                      WidgetHome.data.content.carouselImages = event.data.content.carouselImages;
                      $scope.$emit("Carousel:LOADED");
                      if (!$scope.$$phase)$scope.$digest();
              }
          }
        });

      }]);
})(window.angular);
