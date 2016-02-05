'use strict';

(function (angular, window) {
  angular
    .module('simpleSliderPluginSettings')
    .controller('SettingsHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES','STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {

        var _data = {
          "content": {
            "carouselImages": []
          },
          "settings": {
            "speed": ""

          },
          "design":{
            "mode":"",
            "mode_gap":true
          }
        };

        var SettingsHome=this;
        SettingsHome.masterData = null;
        SettingsHome.data = angular.copy(_data);


        function updateMasterItem(data) {
          SettingsHome.masterData = angular.copy(data);
        }

        function isUnchanged(data) {
          return angular.equals(data, SettingsHome.masterData);
        }


        SettingsHome.saveData = function (newObj, tag) {
          if (typeof newObj === 'undefined') {
            return;
          }
          SettingsHome.success = function (result) {
            console.info('Saved data result: ', result);
            updateMasterItem(newObj);
          };
          SettingsHome.error = function (err) {
            console.error('Error while saving data : ', err);
          };
          DataStore.save(newObj, tag).then(SettingsHome.success, SettingsHome.error);
        };

        /*Init method call, it will bring all the pre saved data*/
        SettingsHome.init = function () {
          SettingsHome.success = function (result) {
            console.info('init success result:', result);
            if (result) {
              SettingsHome.data = result.data;
              if (!SettingsHome.data.settings){
                SettingsHome.data.settings = {};
              }

              if(!SettingsHome.data.settings.speed)
               SettingsHome.data.settings.speed = 0;
            }
          };
          SettingsHome.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
            else if (err && err.code === STATUS_CODE.NOT_FOUND) {
              SettingsHome.saveData(JSON.parse(angular.toJson(SettingsHome.data)), TAG_NAMES.SIMPLE_SLIDER_INFO);
            }
          };
          DataStore.get(TAG_NAMES.SIMPLE_SLIDER_INFO).then(SettingsHome.success, SettingsHome.error);
        };
        SettingsHome.init();

        /*
         * create an artificial delay so api isnt called on every character entered
         * */
        var tmrDelay = null;
        var saveDataWithDelay = function (newObj) {
          if (newObj) {
            if (isUnchanged(newObj)) {
              return;
            }
            if (tmrDelay) {
              clearTimeout(tmrDelay);
            }
            tmrDelay = setTimeout(function () {
              SettingsHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.SIMPLE_SLIDER_INFO);
            },1000);
          }
        };

        $scope.$watch(function () {
          return SettingsHome.data;
        }, saveDataWithDelay, true);
      }]);
})(window.angular, window);