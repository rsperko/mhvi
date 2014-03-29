'use strict';

angular.module('trackingApp')
    .factory('volunteerResource', ["resourceFactory", function(resourceFactory) {
        var service = resourceFactory("/api/entities/:id",
            {
                id:"@id"
            });
        return service;
    }])
    .factory('volunteerService', ["volunteerModel", "$http", "$q", function(volunteerModel, $http, $q) {
        var load = function() {
            var defer = $q.defer();

            $http.get('/api/entities/').then(function(result) {
                var ret = [];

                _.each(result.data, function(data) {
                    var items = volunteerModel(data.id, data);
                    ret.push(items);
                });

                defer.resolve(ret);
            });

            return defer.promise;
        };
        return load;
    }]);