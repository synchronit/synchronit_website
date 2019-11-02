var app = require('../config');

app.controller('contactController', ['$scope', '$http', 'pageService', 'NgMap',
    function ($scope, $http, pageService, NgMap) {

        $scope.pageClass = 'page contact';

        NgMap.getMap().then(function (map) {
            $scope.map = map;
        });

        $scope.reLocate = function (country) {
            $scope.page.location = country.location;
            var element = document.getElementsByClassName('country active')[0];
            element.className = 'country';
            document.getElementById(country.country).className = 'country active';
        };

        $scope.sendEmail = function (url) {
            if (!$scope.contactForm.name.$error.required
                    && !$scope.contactForm.email.$error.required && !$scope.contactForm.email.$error.email
                    && !$scope.contactForm.message.$error.required) {
                $http.post(url, {
                    'name': $scope.name,
                    'email': $scope.email,
                    'message': $scope.message
                }).success(function (data, status, headers, config) {
                    $scope.success = true;
                }).error(function (data, status, headers, config) {
                    $scope.error = true;
                });
            }
        };

        pageService.getPageData(function (data) {
            $scope.page = data;
        });
    }]);
