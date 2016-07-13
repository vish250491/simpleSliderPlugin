"use strict";
describe('Unit : Controller - WidgetHomeCtrl', function () {

// load the controller's module

    var WidgetHomeCtrl,$timeout, $q,scope, Buildfire, Datastore, TAG_NAMES, STATUS_CODE, ViewStack, $rootScope,uvoInfo;

    beforeEach(module('simpleSliderPluginWidget'));

    beforeEach(inject(function ($controller,_$timeout_, _$q_, _Buildfire_, _DataStore_, _TAG_NAMES_, _STATUS_CODE_, _$rootScope_) {

        scope = _$rootScope_.$new();
        $timeout : _$timeout_
        $q = _$q_;

        Datastore=jasmine.createSpyObj('Datastore',['save','get']);
        Buildfire= jasmine.createSpyObj('Buildfire',['']);
        Buildfire.datastore=jasmine.createSpyObj('datastore',['onUpdate','onRefresh']);
        Buildfire.components=jasmine.createSpyObj('components',['','']);
        Buildfire.components.carousel=jasmine.createSpyObj('carousel',['view','']);

        WidgetHomeCtrl = $controller('WidgetHomeCtrl', {
            Datastore:Datastore,
            TAG_NAMES:_TAG_NAMES_,
            DB:_DataStore_,
            $scope: scope,
            Buildfire:Buildfire

        });



    }));


    describe('Units: units should be Defined', function () {

        it('it should pass if ContentHome is defined', function () {
            Datastore.get.and.callFake(function(cb){

                var defer=q.defer();
                defer.resolve({});
                return defer.promise;
                cb(TAG_NAMES.SIMPLE_SLIDER_INFO);

            });
            WidgetHomeCtrl.data={
                settings:{
                    speed:0
                },
                content:{
                    carouselImages:['SSASAS']
                },
                design:{
                    mode:''
                }

            };
            WidgetHomeCtrl.view={
                _applySlider:function(){

                },
                loadItems:function(){

                }
            }
            expect(WidgetHomeCtrl).toBeDefined();
            scope.$digest();
            scope.$emit("Carousel:LOADED");
        });

        it('it should pass if ContentHome is defined ELSE CASE', function () {
            Datastore.get.and.callFake(function(cb){

                var defer=q.defer();
                defer.resolve({});
                return defer.promise;
                cb(TAG_NAMES.SIMPLE_SLIDER_INFO);

            });

            WidgetHomeCtrl.view={
                _applySlider:function(){

                },
                loadItems:function(){

                }
            }
            expect(WidgetHomeCtrl).toBeDefined();
            scope.$digest();
            scope.$emit("Carousel:LOADED");
        });


        it('it should pass if ContentHome is defined ELSE CASE', function () {


            WidgetHomeCtrl.view={
                loadItems:function(){

                }
            };
            expect(WidgetHomeCtrl).toBeDefined();

            scope.$emit("Carousel:LOADED");
        });




    });

    describe('Buildfire ',function(){

    })


});