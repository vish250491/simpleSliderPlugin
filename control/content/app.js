'use strict';
(function (angular) {
    angular
        .module('simpleSliderPluginContent', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/home.html',
                    controllerAs: 'ContentHome',
                    controller: 'ContentHomeCtrl'
                })
                .otherwise('/');
        }])
})(window.angular);
