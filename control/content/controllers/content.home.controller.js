'use strict';

(function (angular, window) {
  angular
    .module('simpleSliderPluginContent')
    .controller('ContentHomeCtrl', ['TAG_NAMES', 'DataStore', '$scope', 'Buildfire',
        function (TAG_NAMES, DataStore, $scope, Buildfire) {

            var _data = {
                "content": {
                    "carouselImages": []
                },
                "settings": {
                    "speed": ""

                }
            };

            var ContentHome=this;
            ContentHome.masterData = null;
            ContentHome.data = angular.copy(_data);

            // create a new instance of the buildfire carousel editor
            ContentHome.editor = new Buildfire.components.carousel.editor("#carousel");

            // this method will be called when a new item added to the list
            ContentHome.editor.onAddItems = function (items) {
                console.log('Content info==========================',ContentHome.info);
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
                var temp = ContentHome.info.data.content.carouselImages[oldIndex];
                ContentHome.data.content.carouselImages[oldIndex] = ContentHome.info.data.content.carouselImages[newIndex];
                ContentHome.data.content.carouselImages[newIndex] = temp;
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
                        console.info('init success result:', result);
                        if (Object.keys(result.data).length > 0) {
                            ContentHome.data = result.data;
                        }
                        if (ContentHome.data) {
                            if (!ContentHome.data.content)
                                ContentHome.data.content = {};

                            if (!ContentHome.data.content.carouselImages)
                                ContentHome.editor.loadItems([]);
                            else
                                ContentHome.editor.loadItems(ContentHome.data.content.carouselImages);
                            updateMasterItem(ContentHome.data);
                        }
                        if (tmrDelay)clearTimeout(tmrDelay);
                    }
                    , error = function (err) {
                        if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                            console.error('Error while getting data', err);
                            if (tmrDelay)clearTimeout(tmrDelay);
                        }
                        else if (err && err.code === STATUS_CODE.NOT_FOUND) {
                            ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.SIMPLE_SLIDER_INFO);
                        }
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
                    tmrDelay = setTimeout(function () {
                        ContentHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.SIMPLE_SLIDER_INFO);
                    }, 500);
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