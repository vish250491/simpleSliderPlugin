'use strict';

(function (angular, window) {
  angular
    .module('simpleSliderPluginDesign')
    .controller('DesignHomeCtrl', ['TAG_NAMES', 'DataStore', '$scope', 'Buildfire','CAROUSAL_TYPE',
        function (TAG_NAMES, DataStore, $scope, Buildfire,CAROUSAL_TYPE) {

            var _data = {
                "content":{
                    "carouselImages":[
                        {
                            "action":"noAction",
                            "iconUrl":"http://buildfire.imgix.net/b55ee984-a8e8-11e5-88d3-124798dea82d/1dc29a50-11be-11e6-ad08-375cc71b6ca7.jpg",
                            "title":"image"
                        },
                        {
                            "action":"noAction",
                            "iconUrl":"http://buildfire.imgix.net/b55ee984-a8e8-11e5-88d3-124798dea82d/1cee3350-11be-11e6-92ea-27ed66023d52.jpg",
                            "title":"image"
                        },
                        {
                            "action":"noAction",
                            "iconUrl":"http://buildfire.imgix.net/b55ee984-a8e8-11e5-88d3-124798dea82d/1e40a3f0-11be-11e6-ad08-375cc71b6ca7.jpg",
                            "title":"image"
                        }
                    ]
                },
                "settings":{
                    "speed":"2"
                },
                "design":{
                    "mode":"MobileScreen",
                    "mode_gap":true
                }
            }

            var DesignHome=this;
            DesignHome.masterData = {
                "content":{
                    "carouselImages":[
                        {
                            "action":"noAction",
                            "iconUrl":"http://buildfire.imgix.net/1459529554163-05176145874429494/7bdab0c0-f82b-11e5-8dca-3f9a537544dc.jpg?fit=crop&w=342&h=193",
                            "title":"image"
                        },
                        {
                            "action":"noAction",
                            "iconUrl":"http://buildfire.imgix.net/1459529554163-05176145874429494/7cc44d70-f82b-11e5-a9d8-55461c8fe352.jpg?fit=crop&w=342&h=193",
                            "title":"image"
                        },
                        {
                            "action":"noAction",
                            "iconUrl":"http://buildfire.imgix.net/1459529554163-05176145874429494/7d9a8930-f82b-11e5-a9d8-55461c8fe352.jpg?fit=crop&w=342&h=193",
                            "title":"image"
                        }
                    ]
                },
                "settings":{
                    "speed":"2"
                },
                "design":{
                    "mode":"",
                    "mode_gap":true
                }
            }
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
                        if(!result.id){
                            DesignHome.data=_data;
                        }else{
                            console.info('init success result:', result);
                            if (result) {
                                DesignHome.data = result.data;
                            }
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