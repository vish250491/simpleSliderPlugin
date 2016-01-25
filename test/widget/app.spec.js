describe('Unit: simpleSliderPluginWidget widget app', function () {
    describe('Unit: app routes', function () {
        beforeEach(module('simpleSliderPluginWidget'));
        var location, route, rootScope, compile, scope, $filter;
        beforeEach(inject(function (_$rootScope_, _$compile_, $rootScope, _$filter_) {
            // route = _$route_;
            rootScope = _$rootScope_;
            compile = _$compile_;
            scope = $rootScope.$new();
            $filter = _$filter_;

        }));

        describe('Home route', function () {
            beforeEach(inject(
                function ($httpBackend) {
                    $httpBackend.expectGET('/')
                        .respond(200);
                }));
            it('should load the home page on successful load of location path /', function () {

            });
        });


    });

    describe('buildFireCarousel directive test', function () {
        var $compile, $rootScope, buildFireCarousel, $scope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
        }));
        beforeEach(function () {
            buildFireCarousel = $compile('<div build-fire-carousel=""></div>')($scope);
            $rootScope.$digest();
        });

        it('it should pass and view switcher of div should be 1', function () {
            expect(buildFireCarousel.length).toEqual(1);
            buildfire.messaging.onReceivedMessage("aa")
        });
    });

    describe('buildFireCarousel2 directive test', function () {
        var $compile, $rootScope, buildFireCarousel, $scope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
        }));
        beforeEach(function () {
            buildFireCarousel = $compile('<div build-fire-carousel2=""></div>')($scope);
            $rootScope.$digest();
        });

        it('it should pass and view switcher of div should be 1', function () {
            expect(buildFireCarousel.length).toEqual(1);
            buildfire.messaging.onReceivedMessage("aa")
        });
    });

    describe('buildFireCarousel3 directive test', function () {
        var $compile, $rootScope, buildFireCarousel, $scope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
        }));
        beforeEach(function () {
            buildFireCarousel = $compile('<div build-fire-carousel3=""></div>')($scope);
            $rootScope.$digest();
        });

        it('it should pass and view switcher of div should be 1', function () {
            expect(buildFireCarousel.length).toEqual(1);
            buildfire.messaging.onReceivedMessage("aa")
        });
    });

    describe('buildFireCarousel4 directive test', function () {
        var $compile, $rootScope, buildFireCarousel, $scope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
        }));
        beforeEach(function () {
            buildFireCarousel = $compile('<div build-fire-carousel4=""></div>')($scope);
            $rootScope.$digest();
        });

        it('it should pass and view switcher of div should be 1', function () {
            expect(buildFireCarousel.length).toEqual(1);
            buildfire.messaging.onReceivedMessage("aa")
        });
    });


    describe('calling the buildfire.messaging.onReceivedMessage for AddNewItem condition', function () {
        var  $rootScope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function ( _$rootScope_) {

            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'AddNewItem',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });

        it('it should pass when buildfire.messaging.onReceivedMessage', function () {

            $rootScope.$apply();
        });
    });

    describe('calling the buildfire.messaging.onReceivedMessage for AddNewItem condition', function () {
        var $rootScope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function (_$rootScope_) {

            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'OpenItem',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });

        xit('it should pass when buildfire.messaging.onReceivedMessage', function () {
            RewardCache.setReward();
            $rootScope.$apply();
        });
    });

    describe('calling the buildfire.messaging.onReceivedMessage for UpdateItem condition', function () {
        var $rootScope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function ( _$rootScope_) {

            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'UpdateItem',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });

        xit('it should pass when buildfire.messaging.onReceivedMessage', function () {
            RewardCache.setReward();
            $rootScope.$apply();
        });
    });


    describe('calling the buildfire.messaging.onReceivedMessage for AddNewItem condition', function () {
        var  $rootScope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function ( _$rootScope_) {

            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'ReturnHome'
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });

        xit('it should pass when buildfire.messaging.onReceivedMessage', function () {
            RewardCache.setReward();
            $rootScope.$apply();
        });
    });

    describe('calling the buildfire.messaging.onReceivedMessage for ListSorted condition', function () {
        var  $rootScope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'ListSorted',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });

        xit('it should pass when buildfire.messaging.onReceivedMessage', function () {
            RewardCache.setReward();
            $rootScope.$apply();
        });
    });

    describe('calling the buildfire.messaging.onReceivedMessage for UpdateApplication condition', function () {
        var  $rootScope;
        beforeEach(module('simpleSliderPluginWidget'));
        beforeEach(inject(function ( _$rootScope_) {

            $rootScope = _$rootScope_;
        }));
        var msg = {
            type:'UpdateApplication',
            data:{
                pointsToRedeem:5
            }
        };
        it('it should pass when buildfire.messaging.onReceivedMessage', function () {
            buildfire.messaging.onReceivedMessage(msg)
            $rootScope.$apply();
        });

        xit('it should pass when buildfire.messaging.onReceivedMessage', function () {
            RewardCache.setReward();
            $rootScope.$apply();
        });
    });


    xdescribe('The test filter', function () {
        'use strict';

        var $filter;

        beforeEach(function () {
            module('simpleSliderPluginWidget');

            inject(function (_$filter_) {
                $filter = _$filter_;
            });
        });

        it('should Crop the Image', function () {
            // Arrange.
            var url = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150', result;
            var updatedUrl = 'http://s7obnu.cloudimage.io/s/crop/250x250/https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150';
            // Act.
            result = $filter('getImageUrl')(url, '250','250','no');

            // Assert.
            expect(result).toEqual(updatedUrl);
        });
        it('should Crop the Image when url', function () {
            // Arrange.
            var url = 'http://s7obnu.cloudimage.io/s/resizenp/250x250', result,
                updatedUrl = 'http://s7obnu.cloudimage.io/s/resizenp/250x250/http://s7obnu.cloudimage.io/s/resizenp/250x250';
            // Act.
            result = $filter('getImageUrl')(url, '250','250','resize');

            // Assert.
            expect(result).toEqual(updatedUrl);
        });
    });
});