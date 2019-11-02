var app = angular.module('teamshore', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngMap']);

app.config(['$routeProvider', '$sceDelegateProvider', '$locationProvider',
    function ($routeProvider, $sceDelegateProvider, $locationProvider) {
        $routeProvider
                .when('/', {
                    controller: 'pageController',
                    templateUrl: 'app/views/home.html'
                })
                .when('/people', {
                    controller: 'pageController',
                    templateUrl: 'app/views/page.html'
                })
                .when('/purposes', {
                    controller: 'pageController',
                    templateUrl: 'app/views/page.html'
                })
                .when('/process', {
                    controller: 'pageController',
                    templateUrl: 'app/views/page.html'
                })
                .when('/practices', {
                    controller: 'pageController',
                    templateUrl: 'app/views/page.html'
                })
                .when('/spoc', {
                    controller: 'pageController',
                    templateUrl: 'app/views/page.html'
                })
                .when('/lean', {
                    controller: 'pageController',
                    templateUrl: 'app/views/page.html'
                })
                .when('/on-site', {
                    controller: 'pageController',
                    templateUrl: 'app/views/page.html'
                })
                .when('/contact', {
                    controller: 'contactController',
                    templateUrl: 'app/views/contact.html'
                })
                .otherwise({redirectTo: '/'});


        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**']);

        //$locationProvider.html5Mode(true);
    }]);

module.exports = app;
