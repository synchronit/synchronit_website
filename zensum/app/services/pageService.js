var app = require('../config');

app.factory('pageService', ['$http', '$q', '$route', function ($http, $q, $route) {

    return {
        getPageData: function (callback) {
            
            var path = $route.current.originalPath;
            //var deferred = $q.defer();
            
            if(path === '/') {
                path = '/home';
            }

            $http.get("app/fakes" + path + ".json")
                    .success(function (data, status, headers, config) {
                        //deferred.resolve(data);
                        callback(data);
                    })
                    .error(function (data, status, headers, config) {
                        //deferred.reject(status);
                    });

            //return deferred.promise;
        }
    };

}]);
