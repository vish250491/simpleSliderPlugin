'use strict';

(function (angular, window) {
  angular
    .module('simpleSliderPluginDesign')
    .controller('DesignHomeCtrl', ['TAG_NAMES', 'DataStore', '$scope', 'Buildfire','CAROUSAL_TYPE',
        function (TAG_NAMES, DataStore, $scope, Buildfire,CAROUSAL_TYPE) {

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

            var DesignHome=this;
            DesignHome.masterData = null;
            DesignHome.CAROUSAL_TYPE=CAROUSAL_TYPE;
            DesignHome.data = angular.copy(_data);


            function updateMasterItem(data) {
                DesignHome.masterData = angular.copy(data);
            }

            function isUnchanged(data) {
                return angular.equals(data, DesignHome.masterData);
            }

            /*
             * Go pull any previously saved data
             * */
            DesignHome.init = function () {
                var success = function (result) {
                        console.info('init success result:', result);
                        if (result) {
                            DesignHome.data = result.data;
                        }
                        if (DesignHome.data) {
                            if (!DesignHome.data.design)
                                DesignHome.data.design = {};

                            if (!DesignHome.data.design.mode)
                                DesignHome.data.design.mode=CAROUSAL_TYPE.WIDTH;

                            updateMasterItem(DesignHome.data);
                        }
                        if (tmrDelay)clearTimeout(tmrDelay);
                    }
                    , error = function (err) {
                      console.log(err);
                    };
                DataStore.get(TAG_NAMES.SIMPLE_SLIDER_INFO).then(success, error);
            };
            DesignHome.init();

            /*
             * Call the datastore to save the data object
             */
            DesignHome.saveData = function (newObj, tag) {
                if (typeof newObj === 'undefined') {
                    return;
                }
                var success = function (result) {
                        console.info('Saved data result: ', result);
                        updateMasterItem(newObj);
                    }
                    , error = function (err) {
                        console.error('Error while saving data : ', err);
                    };
                DataStore.save(newObj, tag).then(success, error);
            };

            /*
             * create an artificial delay so api isnt called on every character entered
             * */
            var tmrDelay = null;
            DesignHome.saveDataWithDelay = function (newObj) {
                if (newObj) {
                    if (isUnchanged(newObj)) {
                        return;
                    }
                    if (tmrDelay) {
                        clearTimeout(tmrDelay);
                    }
                    tmrDelay = setTimeout(function () {
                        DesignHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.SIMPLE_SLIDER_INFO);
                    }, 1000);
                }
            };
            /*
             * watch for changes in data and trigger the saveDataWithDelay function on change
             * */
            $scope.$watch(function () {
                return DesignHome.data;
            }, DesignHome.saveDataWithDelay, true);

            // Function to validate youtube rss feed link entered by user.

        }]);
})(window.angular, window);