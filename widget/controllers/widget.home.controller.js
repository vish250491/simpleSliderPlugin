'use strict';

(function (angular) {
  angular
    .module('simpleSliderPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', '$rootScope','CAROUSAL_TYPE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, $rootScope,CAROUSAL_TYPE) {
        var WidgetHome = this;
          WidgetHome.view=null;
          WidgetHome.firstTime= true;
          $scope.$on("Carousel:LOADED", function () {
              if (!WidgetHome.view) {
                  console.log('if------', WidgetHome.view);
                  var speed=WidgetHome.data.settings.speed*1000;

                  WidgetHome.view = new Buildfire.components.carousel.view("#carousel",[],  WidgetHome.data.design.mode,speed);
                  WidgetHome.view.loadItems([],null, WidgetHome.data.design.mode,speed);

              }
              if (WidgetHome && WidgetHome.data && WidgetHome.data.content &&  WidgetHome.data.content.carouselImages && (WidgetHome.data.content.carouselImages.length>0)) {
                  var speed=WidgetHome.data.settings.speed*1000;
                  WidgetHome.view.loadItems(WidgetHome.data.content.carouselImages,null, WidgetHome.data.design.mode,speed);
                //  WidgetHome.view._applySlider(speed);
              } else {
                  WidgetHome.view.loadItems([]);
              }
          });

        var init = function () {
          var success = function (result) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.content){
                  WidgetHome.data.content = {};
              }

              if (!WidgetHome.data.settings){
                  WidgetHome.data.settings = {};
                  WidgetHome.data.settings.speed=3;
              }

                  if (!WidgetHome.data.design){
                      WidgetHome.data.design = {};
                      WidgetHome.data.design.mode_gap = true;
                  }


              if (WidgetHome.data.content.carouselImages || WidgetHome.data.design.mode) {
                  if( WidgetHome.data.design.mode==CAROUSAL_TYPE.MOBILESCEEN)
                      WidgetHome.data.design.mode_gap=false;
                  else
                      WidgetHome.data.design.mode_gap=true;
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
              WidgetHome.firstTime=false;
            console.log(">>>>>>>>>>>>>>>", event.data);
              if(event.data && event.data.content){
                  if (!WidgetHome.data.content)
                      WidgetHome.data.content = {};
                      WidgetHome.data.content.carouselImages = event.data.content.carouselImages;
                      $scope.$emit("Carousel:LOADED");
                      if (!$scope.$$phase)$scope.$digest();
              }
              if(event.data && event.data.settings){
                  if (!WidgetHome.data.settings)
                      WidgetHome.data.settings = {};
                  WidgetHome.data.settings.speed = event.data.settings.speed;
                  $scope.$emit("Carousel:LOADED");
                  if (!$scope.$$phase)$scope.$digest();
              }
              if(event.data && event.data.design){
                  if (!WidgetHome.data.design){
                      WidgetHome.data.design = {};
                      WidgetHome.data.design.mode_gap=true;
                  }

                  WidgetHome.data.design.mode = event.data.design.mode;

                  if( WidgetHome.data.design.mode==CAROUSAL_TYPE.MOBILESCEEN)
                      WidgetHome.data.design.mode_gap=false;
                  else
                      WidgetHome.data.design.mode_gap=true;

                  $scope.$emit("Carousel:LOADED");
                  if (!$scope.$$phase)$scope.$digest();
              }
          }
        });

      }]);
})(window.angular);
