'use strict';

angular.module('excelApp')
    .config(function ($stateProvider) {
        $stateProvider
//            .state('login', {
//                url: '/login',
//                templateUrl: 'app/account/login/login.html',
//                controller: 'LoginCtrl'
//            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupCtrl'
            })
            .state('app', {
                url: '/',
                templateUrl: 'app/home/home.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/home/home.css', '../bower_components/ng-repeat-owl-carousel/dist/ngRepeatOwlCarousel.min.js']);
                    }]
                }
            })
            .state('component', {
                url: '/component',
                templateUrl: 'app/reusableComponents/component.html',
                controller: 'ComponentCtrl as cm'
            });
    });
//,
//resolve: {
//    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
//        return $ocLazyLoad.load(['app/reusableComponents/componentCtrl.js']);
//    }]
//}