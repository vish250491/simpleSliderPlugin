'use strict';

(function (angular, window) {
  angular
    .module('simpleSliderPluginContent')
    .controller('ContentHomeCtrl', ['TAG_NAMES', 'DataStore', '$scope', 'Buildfire',
        function (TAG_NAMES, DataStore, $scope, Buildfire) {
            var tempCarousalData=null;
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
                },
                'default' : 'true'
            }

            var ContentHome=this;
            ContentHome.masterData = {
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
                },
                'default' : 'true'
            }
//            ContentHome.data = angular.copy(_data);

            // create a new instance of the buildfire carousel editor
            ContentHome.editor = new Buildfire.components.carousel.editor("#carousel");

            // this method will be called when a new item added to the list
            ContentHome.editor.onAddItems = function (items) {
                console.log('Content info==========================',ContentHome.info);
                tempCarousalData=items;
                if(!ContentHome.data) {
                    ContentHome.data = angular.copy(_data);
                }
                if (!ContentHome.data.design){
                    ContentHome.data.design = {};
                    ContentHome.data.design.mode_gap=true;
                }

                if (ContentHome && ContentHome.data && ContentHome.data.content && !ContentHome.data.content.carouselImages)
                    ContentHome.data.content.carouselImages = [];
                ContentHome.data.content.carouselImages.push.apply(ContentHome.data.content.carouselImages, items);
                if (!$scope.$$phase)$scope.$digest();
            };

            // this method will be called when an item deleted from the list
            ContentHome.editor.onDeleteItem = function (item, index) {
                ContentHome.data.content.carouselImages.splice(index, 1);
                if (!$scope.$$phase)$scope.$digest();
            };

            // this method will be called when you edit item details
            ContentHome.editor.onItemChange = function (item, index) {
                ContentHome.data.content.carouselImages.splice(index, 1, item);
                if (!$scope.$$phase)$scope.$digest();
            };

            // this method will be called when you change the order of items
            ContentHome.editor.onOrderChange = function (item, oldIndex, newIndex) {
              var items = ContentHome.data.content.carouselImages;

              var tmp = items[oldIndex];

              if (oldIndex < newIndex) {
                for (var i = oldIndex + 1; i <= newIndex; i++) {
                  items[i - 1] = items[i];
                }
              } else {
                for (var i = oldIndex - 1; i >= newIndex; i--) {
                  items[i + 1] = items[i];
                }
              }
              items[newIndex] = tmp;

              ContentHome.data.content.carouselImages = items;
                if (!$scope.$$phase)$scope.$digest();
            };

            function updateMasterItem(data) {
                ContentHome.masterData = angular.copy(data);
            }

            function isUnchanged(data) {
                return angular.equals(data, ContentHome.masterData);
            }

            /*
             * Go pull any previously saved data
             * */
            ContentHome.init = function () {
                var success = function (result) {
                        if(!result.id){
                            ContentHome.data= _data
                        }else{
                            console.info('init success result:', result);
                            if (Object.keys(result.data).length > 0) {
                                ContentHome.data = result.data;
                            }
                        }

                        if (ContentHome.data) {
                            if (!ContentHome.data.content)
                                ContentHome.data.content = {};
                            if(!ContentHome.data.settings)
                                ContentHome.data.settings = {speed: 0};
                            if(!ContentHome.data.design)
                                ContentHome.data.design = {"mode":"", "mode_gap":true };

                            if (!ContentHome.data.content.carouselImages)
                                ContentHome.editor.loadItems([]);
                            else
                                ContentHome.editor.loadItems(ContentHome.data.content.carouselImages);
                            updateMasterItem(ContentHome.data);
                        }

                        if (tmrDelay)clearTimeout(tmrDelay);
                    }
                    , error = function (err) {
                      console.log(err);
                    };
                DataStore.get(TAG_NAMES.SIMPLE_SLIDER_INFO).then(success, error);
            };
            ContentHome.init();

            /*
             * Call the datastore to save the data object
             */
            ContentHome.saveData = function (newObj, tag) {
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
            ContentHome.saveDataWithDelay = function (newObj) {
                if (newObj) {

                    if (isUnchanged(newObj)) {
                        return;
                    }
                    if (tmrDelay) {
                        clearTimeout(tmrDelay);
                    }
                    if(newObj.default){
                        newObj=  {
                            "content":{
                                "carouselImages":[

                                ]
                            },
                            "settings":{
                                "speed":"0"
                            },
                            "design":{
                                "mode":"",
                                "mode_gap":true
                            },
                            "default" : false
                        };
                        ContentHome.data=newObj;
                        if(tempCarousalData){
                            ContentHome.editor.loadItems(tempCarousalData);
                            newObj.content.carouselImages=tempCarousalData;
                        }else{
                            ContentHome.editor.loadItems([]);
                        }

                    }
                    tmrDelay = setTimeout(function () {
                        ContentHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.SIMPLE_SLIDER_INFO);
                        tempCarousalData=null;
                    }, 1000);
                }
            };
            /*
             * watch for changes in data and trigger the saveDataWithDelay function on change
             * */
            $scope.$watch(function () {
                return ContentHome.data;
            }, ContentHome.saveDataWithDelay, true);

            // Function to validate youtube rss feed link entered by user.

        }]);
})(window.angular, window);