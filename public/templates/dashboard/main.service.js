angular.module('LoopIn-Web.main')

    .service('MainService', function ($localStorage, $http, domain, api, UtilityService) {

        return {
            getStats: function () {
                return $http(
                    {
                        url: domain + api.stats_getStats,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Stats GET ALL');
                        // console.log(JSON.stringify(data));
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Stats GET ALL failed');
                        return data;
                    })
            }

        }

    });
